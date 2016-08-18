package fixwoback

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
		
		"/ocorrencia"(controller:"ocorrencia", action:"index", method:"GET")
		"/ocorrencia"(controller:"ocorrencia", action:"save", method:"POST")
		"/ocorrencia/$id"(controller:"ocorrencia", action:"update", method:"PUT")

        "/"(view:"/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
