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

public abstract class NativeType<T> {
    protected static final JavaType[] NO_TYPE_PARAMS = {};

    public static final NativeType<Void> VOID = NativeType.forClass(Void.class);

    public static <T> NativeType<T> forClass(final Class<T> simpleType) {
        return new SimpleNativeType<>(simpleType);
    }

    public static <T> NativeType<List<T>> listOf(final NativeType<T> elementType) {
        return new ListNativeType<>(elementType);
    }

    public static <T> NativeType<Map<String, T>> mapOf(final NativeType<T> elementType) {
        return new MapNativeType<>(elementType);
    }

    public static NativeType<?> forType(final Type type) {
        if (type instanceof ParameterizedType) {
            final ParameterizedType genericType = (ParameterizedType)type;
            final Class<?> rawType = (Class<?>)genericType.getRawType();

            if (List.class.isAssignableFrom(rawType)) {
                return listOf(forType(genericType.getActualTypeArguments()[0]));
            }
            if (Map.class.isAssignableFrom(rawType)) {
                return mapOf(forType(genericType.getActualTypeArguments()[1]));
            }
        }

        if (!(type instanceof Class<?>)) {
            throw new IllegalArgumentException(String.format("Unsupported type: %s", type));
        }
        return forClass((Class<?>)type);
    }

    protected static Class<?> wireFor(final Class<?> type) {
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
