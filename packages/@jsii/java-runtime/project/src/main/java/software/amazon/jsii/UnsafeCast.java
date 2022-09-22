package software.amazon.jsii;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public final class UnsafeCast {
    /**
     * Unsafely obtains a view on a given value as an instance of an interface annotated with the {@link Jsii.Proxy}
     * annotation.
     *
     * @param value  the value to be converted.
     * @param target the target type to obtain. This must be an interface with the {@link Jsii.Proxy} annotation.
     *
     * @return the converted value. Will only return {@code null} if {@code value} is {@code null}.
     *
     * @param <T> the return type of the cast.
     *
     * @throws IllegalArgumentException if the provided {@code target} is not a {@link Jsii.Proxy} annotated interface.
     */
    @SuppressWarnings("unchecked")
    public static <T extends JsiiSerializable> T unsafeCast(final JsiiObject value, final Class<T> target) {
        if (value == null) {
            return null;
        }

        if (target.isAssignableFrom(value.getClass())) {
            return (T)value;
        }

        if (!target.isAnnotationPresent(Jsii.class)) {
            throw new IllegalArgumentException(String.format("Class %s does not have the @Jsii annotation!", target.getCanonicalName()));
        }

        if (!target.isAnnotationPresent(Jsii.Proxy.class)) {
            throw new IllegalArgumentException(String.format("Class %s does not have the @Jsii.Proxy annotation!", target.getCanonicalName()));
        }

        final String fqn = target.getAnnotation(Jsii.class).fqn();
        final Jsii.Proxy annotation = target.getAnnotation(Jsii.Proxy.class);
        try {
            final Constructor<? extends JsiiObject> constructor = annotation.value().getDeclaredConstructor(JsiiObjectRef.class);
            @SuppressWarnings("deprecated")
            final boolean oldAccessible = constructor.isAccessible();
            try {
                constructor.setAccessible(true);
                final JsiiObject proxyInstance = constructor.newInstance(value.jsii$objRef.withInterface(fqn));
                return (T) proxyInstance;
            } finally {
                constructor.setAccessible(oldAccessible);
            }
        } catch (final NoSuchMethodException nsme) {
            throw new JsiiError(String.format("Unable to find interface proxy constructor on %s", annotation.value().getCanonicalName()), nsme);
        } catch (final InvocationTargetException | InstantiationException e) {
            throw new JsiiError(String.format("Unable to initialize interface proxy %s", annotation.value().getCanonicalName()), e);
        } catch (final IllegalAccessException iae) {
            throw new JsiiError(String.format("Unable to invoke constructor of %s", annotation.value().getCanonicalName()), iae);
        }
    }

    private UnsafeCast(){
        throw new UnsupportedOperationException();
    }
}