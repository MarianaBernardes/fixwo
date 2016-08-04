
class BootStrap {

    def init = { servletContext ->
		
		println this.class.classLoader.getResource("WEB-INF/context.xml").toString()
    }
    def destroy = {
    }
}
