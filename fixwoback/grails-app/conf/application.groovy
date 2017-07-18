grails.plugin.springsecurity.securityConfigType = "InterceptUrlMap"
grails.plugin.springsecurity.rest.token.validation.enableAnonymousAccess = true

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'com.fixwo.auth.SpringUser'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'com.fixwo.auth.SpringUserSpringRole'
grails.plugin.springsecurity.authority.className = 'com.fixwo.auth.SpringRole'
grails.plugin.springsecurity.interceptUrlMap = [
	[pattern: '/',               	access: ['permitAll']],
	[pattern: '/error',          	access: ['permitAll']],
	[pattern: '/index',          	access: ['permitAll']],
	[pattern: '/index.gsp',      	access: ['permitAll']],
	[pattern: '/api/login/**',     	access: ['permitAll']],
	[pattern: '/login/**',       	access: ['permitAll']],
	[pattern: '/api/guest/**',     	access: ['permitAll']],
	[pattern: '/shutdown',       	access: ['permitAll']],
	[pattern: '/assets/**',      	access: ['permitAll']],
	[pattern: '/**/js/**',       	access: ['permitAll']],
	[pattern: '/**/css/**',      	access: ['permitAll']],
	[pattern: '/**/images/**',   	access: ['permitAll']],
	[pattern: '/**/favicon.ico', 	access: ['permitAll']]
]

grails.plugin.springsecurity.filterChain.chainMap = [
	[pattern: '/assets/**',      filters: 'none'],
	[pattern: '/**/js/**',       filters: 'none'],
	[pattern: '/**/css/**',      filters: 'none'],
	[pattern: '/**/images/**',   filters: 'none'],
	[pattern: '/**/favicon.ico', filters: 'none'],
	[pattern: '/api/guest/**', filters: 'anonymousAuthenticationFilter,restTokenValidationFilter,restExceptionTranslationFilter,filterInvocationInterceptor'],
    [pattern: '/api/**',       filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'],
    [pattern: '/**',           filters: 'JOINED_FILTERS,-restTokenValidationFilter,-restExceptionTranslationFilter']
]

