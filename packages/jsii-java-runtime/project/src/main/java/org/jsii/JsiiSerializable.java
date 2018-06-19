package org.jsii;

/**
 * Marks a class as serializable from native to javascript.
 * {@link JsiiObject} implements this as well as all generated jsii interfaces.
 * The actual metadata needed for serialization is defined by the @Jsii annotations attached to these
 * types, but Jackson doesn't support selecting serializers by annotations, so we needed a type as a marker.
 * See {@link JsiiObjectMapper} for details.
 */
public interface JsiiSerializable {
}
