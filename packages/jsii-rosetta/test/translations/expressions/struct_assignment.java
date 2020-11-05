public class Test {
    private String key;
    public String getKey() {
        return this.key;
    }
    public Test key(String key) {
        this.key = key;
        return this;
    }
}

final Test x = new Test().key("value");
