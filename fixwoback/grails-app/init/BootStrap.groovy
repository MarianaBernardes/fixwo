
import com.fixwo.domain.Cliente

class BootStrap {

    def init = { servletContext ->
		
		new Cliente(nome:"The Stand").save(flush:true)
		new Cliente(nome:"The Shining").save(flush:true)

    }
    def destroy = {
    }
}
