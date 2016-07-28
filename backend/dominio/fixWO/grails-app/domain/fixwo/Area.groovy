package fixwo

class Area {

    int idWikiMapia
    Cliente cliente
    static constraints = {
		cliente (nullable:true, blank:true)
	}
}
