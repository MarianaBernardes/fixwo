package fixwo
import grails.rest.*
import grails.converters.*

class GetOSController extends RestfulController{

    static responseFormats=["json", "xml"]
	GetOSController(){
		super(Teste)
	}
}
