package software.amazon.jsii;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Internal
public abstract class NativeType<T> {
    protected static final JavaType[] NO_TYPE_PARAMS = {};

    /**
     * A {@link NativeType} representation for `void`.
     */
    public static final NativeType<Void> VOID = NativeType.forClass(Void.class);

    /**
     * Creates a {@link NativeType} representation for classes that are neither {@link List} nor {@link Map} subclasses.
     *
     * @param simpleType the Java class to be represented.
     * @param <T> the static type of {@code simpleType}.
     *
     * @return a new {@link NativeType} instance.
     *
     * @throws IllegalArgumentException if a {@link List} or {@link Map} subclass is passed as an argument.
     */
    public static <T> NativeType<T> forClass(final Class<T> simpleType) {
        return new SimpleNativeType<>(simpleType);
    }

    /**
     * Creates a {@link NativeType} representation for a {@link List} of some {@code elementType}.
     *
     * @param elementType the type of elements in the {@link List}.
     * @param <T> the static type of the elements in the {@link List}.
     *
     * @return a new {@link NativeType} instance.
     */
    public static <T> NativeType<List<T>> listOf(final NativeType<T> elementType) {
        return new ListNativeType<>(elementType);
    }

    /**
     * Creates a {@link NativeType} representation for a {@link Map} of {@link String} to some {@code elementType}.
     *
     * @param elementType the type of values in the {@link Map}.
     * @param <T> the static type of the values in the {@link Map}.
     *
     * @return a new {@link NativeType} instance.
     */
    public static <T> NativeType<Map<String, T>> mapOf(final NativeType<T> elementType) {
        return new MapNativeType<>(elementType);
    }

    /**
     * Creates a {@link NativeType} for the given Java type description. This particular API is unsafe and should not be
     * used if any of the other APIs can be.
     *
     * @param type the {@link Type} to be represented. It can be any type, including a {@link Class} reference, however
     *             when a {@link Class} instance is available, the caller should use {@link #forClass(Class)},
     *             {@link #listOf(NativeType)} and {@link #mapOf(NativeType)} appropriately instead, as this operation
     *             is not checked at runtime.
     * @param <T> the static type of the represented type. This operation is not checked, leaving the caller responsible
     *            for ensuring the correct type is specified.
     *
     * @return a new {@link NativeType} instance.
     */
    @SuppressWarnings("unchecked")
    public static <T>  NativeType<T> forType(final Type type) {
        if (type instanceof ParameterizedType) {
            final ParameterizedType genericType = (ParameterizedType)type;
            final Class<?> rawType = (Class<?>)genericType.getRawType();

            // Provided List<T>, we abide by the value of T
            if (List.class.isAssignableFrom(rawType)) {
                return (NativeType<T>)listOf(forType(genericType.getActualTypeArguments()[0]));
            }
            // Provided Map<?, T>, we abide by the value of T
            if (Map.class.isAssignableFrom(rawType)) {
                return (NativeType<T>)mapOf(forType(genericType.getActualTypeArguments()[1]));
            }
        }

        // If it's not a List<T> or Map<String, T>, it MUST be a Class, or we don't know how to handle it
        if (!(type instanceof Class<?>)) {
            throw new IllegalArgumentException(String.format("Unsupported type: %s", type));
        }

        // Provided the raw class List, interpret it as List<Object>
        if (List.class.isAssignableFrom((Class<?>)type)) {
            return (NativeType<T>)listOf(forClass(Object.class));
        }
        // Provided the raw class Map, interpret it as Map<String, Object>
        if (Map.class.isAssignableFrom((Class<?>)type)) {
            return (NativeType<T>)mapOf(forClass(Object.class));
        }

        // Anything else...
        return (NativeType<T>) forClass((Class<?>)type);
    }

    private static Class<?> wireFor(final Class<?> type) {
        if (JsiiObject.class.isAssignableFrom(type)) {
            return JsiiObject.class;
        }
        return type;
    }

    private final JavaType javaType;

    protected NativeType(final JavaType javaType) {
        this.javaType = javaType;
    }

    final JavaType getJavaType() {
        return javaType;
    }

    abstract T transform(final Object value);

    private static final class SimpleNativeType<T> extends NativeType<T> {
        private final Class<T> type;

        SimpleNativeType(final Class<T> simpleType) {
            super(TypeFactory.defaultInstance()
                    .constructSimpleType(wireFor(simpleType), NO_TYPE_PARAMS));
            this.type = simpleType;

            if (List.class.isAssignableFrom(this.type)) {
                throw new IllegalArgumentException(String.format(
                        "Illegal attempt to create a SimpleNativeType with a List type: %s",
                        this.type.getCanonicalName()));
            }
            if (Map.class.isAssignableFrom(this.type)) {
                throw new IllegalArgumentException(String.format(
                        "Illegal attempt to create a SimpleNativeType with a Map type: %s",
                        this.type.getCanonicalName()));
            }
        }

        Class<T> getType() {
            return type;
        }

        @Override
        @SuppressWarnings("unchecked")
        T transform(Object value) {
            if (value != null && this.getType().isInterface() && value instanceof JsiiObject) {
                if (!this.getType().isAssignableFrom(value.getClass()) && this.getType().isAnnotationPresent(Jsii.Proxy.class)) {
                    final Jsii.Proxy annotation = this.getType().getAnnotation(Jsii.Proxy.class);
                    return (T) ((JsiiObject)value).asInterfaceProxy(annotation.value());
                }
            }
            return (T) value;
        }
    }

    private static final class ListNativeType<T> extends NativeType<List<T>> {
        private final NativeType<T> elementType;

        ListNativeType(final NativeType<T> elementType) {
            super(TypeFactory.defaultInstance()
                    .constructCollectionType(List.class, elementType.getJavaType()));
            this.elementType = elementType;
        }

        NativeType<T> getElementType() {
            return elementType;
        }

        @Override
        List<T> transform(Object value) {
            final List<?> original = (List<?>)value;
            return original.stream()
                    .map(this.getElementType()::transform)
                    .collect(Collectors.toList());
        }
    }

    private static final class MapNativeType<T> extends NativeType<Map<String, T>> {
        private static final JavaType STRING_JAVA_TYPE = TypeFactory.defaultInstance()
                .constructSimpleType(String.class, NO_TYPE_PARAMS);

        private final NativeType<T> elementType;

        MapNativeType(final NativeType<T> elementType) {
            super(TypeFactory.defaultInstance()
                    .constructMapType(Map.class, STRING_JAVA_TYPE, elementType.getJavaType()));
            this.elementType = elementType;
        }

        NativeType<T> getElementType() {
            return elementType;
        }

        @Override
        Map<String, T> transform(Object value) {
            @SuppressWarnings("unchecked")
            final Map<String, ?> original = (Map<String, ?>)value;
            return original.entrySet().stream()
                    .collect(Collectors.toMap(
                            Map.Entry::getKey,
                            entry -> this.getElementType().transform(entry.getValue()),
                            // We don't map keys, so there will never be a conflict
                            (existing, replacement) -> existing,
                            // Using LinkedHashMap to preserve ordering of elements
                            LinkedHashMap::new
                    ));
        }
    }
}
