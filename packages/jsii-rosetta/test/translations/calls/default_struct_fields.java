public class Struct {
    private String x;
    public String getX() {
        return this.x;
    }
    public Struct x(String x) {
        this.x = x;
        return this;
    }
    private String y;
    public String getY() {
        return this.y;
    }
    public Struct y(String y) {
        this.y = y;
        return this;
    }
}
public void foo(Struct s) {
    System.out.println(s.getX() + s.getY());
}
