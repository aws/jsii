package software.amazon.jsii;

import com.fasterxml.jackson.core.TreeNode;

/**
 * Marks a class as serializable from native to javascript.
 * {@link JsiiObject} implements this as well as all generated jsii interfaces.
 * The actual metadata needed for serialization is defined by the @Jsii annotations attached to these
 * types, but Jackson doesn't support selecting serializers by annotations, so we needed a type as a marker.
 * See {@link JsiiObjectMapper} for details.
 */
public interface JsiiSerializable {
    /**
     * Serializes this object to JSON. The default behavior is to return an object reference.
     * However, builders implement this method by emitting an actual JSON object of the key/values.
     * @return the jsii/JSON representation of this object
     */
    default TreeNode $jsii$toJson() {
        JsiiObjectRef objRef = JsiiEngine.getInstance().nativeToObjRef(this);
        return objRef.toJson();
    }
}
