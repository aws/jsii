package software.amazon.jsii;

import java.io.File;
import java.lang.management.ManagementFactory;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.security.AccessController;
import java.util.stream.Stream;

/**
 * This wonderful utility can be used to reload classes regardless of whether it was already loaded by the current
 * ClassLoader or not. This is particularly useful when a test needs to go through the burden of checking static
 * initialization is happening as designed.
 *
 * It leverages black magic in the form of shameless down-casting of classloaders to URLClassLoader and may or may not
 * spectacularly blow up on new JVM major versions.
 *
 * THIS IS A DRAGONS LAIR AND YOU SHOULD TREAD CAREFULLY, SO AS NOT TO STEP ON A DRAGON'S TAIL.
 */
public final class ReloadingClassLoader extends URLClassLoader {
    /**
     * Reloads one or more classes, returning the newly loaded version of the first one.
     *
     * @param parent is the parent ClassLoader to use for classes that do not need to be re-loaded.
     * @param clazz  is the first class that needs to be reloaded.
     * @param others a list of any other class that also needs to be reloaded.
     * @param <T>    the static type of the reloaded {@code class}.
     *
     * @return the reloaded version of {@code class}.
     */
    @SuppressWarnings("unchecked")
    public static <T> Class<T> reload(final ClassLoader parent, final Class<T> clazz, final Class<?> ...others) {
        final ClassLoader cl = new ReloadingClassLoader(parent, Stream.concat(Stream.of(clazz), Stream.of(others)).toArray(Class[]::new));
        try {
            return (Class<T>)cl.loadClass(binaryNameOf(clazz));
        } catch (final ClassNotFoundException cnfe) {
            // This is theoretically impossible!
            throw new RuntimeException(cnfe);
        }
    }

    /**
     * Obtains the "binary name" of a class. This is needed because ClassLoaders expect a binary name, and not a
     * canonical class name. Binary names have the pesky "$" separator instead of a "." for member classes.
     *
     * @param clazz the class which binary name is needed.
     *
     * @return {@code clazz}' binary name.
     */
    private static String binaryNameOf(final Class<?> clazz) {
        if (!clazz.isMemberClass()) {
            return clazz.getCanonicalName();
        }
        final Class<?> declaringClass = clazz.getDeclaringClass();
        return String.format("%s$%s", binaryNameOf(declaringClass), clazz.getSimpleName());
    }

    private final Class<?>[] toReload;

    private ReloadingClassLoader(final ClassLoader parent, final Class<?> ...toReload) {
        super(
                Stream.of(toReload)
                        .flatMap(clazz -> urlsFromClassLoader(clazz.getClassLoader()))
                        .toArray(URL[]::new),
                parent
        );
        this.toReload = toReload;
    }

    @Override
    protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
        if (Stream.of(this.toReload).map(ReloadingClassLoader::binaryNameOf).noneMatch(clazz -> clazz.equals(name))) {
            // Not to be reloaded - delegate to the standard flow.
            return super.loadClass(name, resolve);
        }
        // Class is to be reloaded. Conveniently, "findClass" does just that!
        final Class<?> result = this.findClass(name);
        if (resolve) {
            this.resolveClass(result);
        }
        return result;
    }

    private static Stream<URL> urlsFromClassLoader(final ClassLoader classLoader) {
        if (classLoader instanceof URLClassLoader) {
            return Stream.of(((URLClassLoader)classLoader).getURLs());
        }
        // In java >= 9, class loaders may not always be URLClassLoaders, so we need this:
        return Stream
            .of(ManagementFactory.getRuntimeMXBean()
                .getClassPath()
                .split(File.pathSeparator))
            .map(ReloadingClassLoader::toURL);
    }

    private static URL toURL(final String classPathEntry) {
        try {
            return new File(classPathEntry).toURI().toURL();
        } catch (final MalformedURLException ex) {
            throw new IllegalArgumentException("URL could not be obtained from " + classPathEntry, ex);
        }
    }
}
