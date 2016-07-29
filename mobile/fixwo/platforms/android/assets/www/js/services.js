angular.module('starter.services', [])

.factory('Ocorrencias', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var ocorrencias = [
        { id: 0,
	    titulo: 'Faltam papel toalha e sabão',
		localizacao: 'Banheiro 01 PV3, UFLA',
		estado: 'Aberta',
		classificacao: 'Limpeza',
		data: '23/07/2016',
		comentario: 'Como sempre, banheiro sem papel toalha e sabão.',
		imagem: 'img/Wikipedia_mobile_en.png' },

		{ id: 1,
		titulo: 'Buraco nas vias',
		localizacao: 'Rua Jacina, 407-445, Jardim Penha - São Paulo, SP',
		estado: 'Aberta',
		classificacao: 'Vias e Trânsito',
		data: '23/07/2016',
		comentario: 'Grande buraco na via.',
		imagem: 'img/-2037372637_1469194322697.jpg' },

		{ id: 2,
		titulo: 'Vazamento de água',
		localizacao: 'Rua Fradique Coutinho, 771, Pinheiros - São Paulo, SP',
		estado: 'Aberta',
		classificacao: 'Água e Esgoto',
		data: '23/07/2016',
		comentario: 'Vazamento de água na Fradique Coutinho.',
		imagem: 'img/-818441162_1469189233304.jpg' },

		{ id: 3,
		titulo: 'Iluminação pública',
		localizacao: 'Rua Iaiá, 40, Itaim Bibi - São Paulo, SP',
		estado: 'Aberta',
		classificacao: 'Iluminação e Energia',
		data: '23/07/2016',
		comentario: 'Árvore cresceu muito e chegou aos fios. perigo de curto e também impede a iluminação.',
		imagem: 'img/1912112941_1469185680163.jpg' },

		{ id: 4,
		titulo: 'Fiação irregular',
		localizacao: 'Rua Viradouro, 120, Itaim Bibi - São Paulo, SP ',
		estado: 'Fechada',
		classificacao: 'Iluminação e Energia',
		data: '23/07/2016',
		comentario: 'Dois transformadores causando problemas.',
		imagem: 'img/1099555286_1469110055634.jpg' },

		{ id: 5,
		titulo: 'Semáforo quebrado',
		localizacao: 'Avenida Interlagos, 1306-1348, Jardim Umuarama - São Paulo, SP ',
		estado: 'Aberta',
		classificacao: 'Vias e Trânsito',
		data: '23/07/2016',
		comentario: 'Acionador do semáforo para pedestres foi recentemente furtado. Ao lado da entrada de estacionamento da UNIB.',
		imagem: 'img/-1336339069_1469047868770.jpg' },

		{ id: 6,
		titulo: 'Entulho na calçada/via pública',
		localizacao: 'Rua Pangaré, 122-236, Vila Butantã - São Paulo, SP',
		estado: 'Fechada',
		classificacao: 'Limpeza e Conservação',
		data: '23/07/2016',
		comentario: 'Entulho na calçada da USP.',
		imagem: 'img/-152123915_1469033005049.jpg' },

		{ id: 7,
		titulo: 'Fiação irregular',
		localizacao: 'Rua Cardeal Arcoverde, 950, São Paulo - São Paulo, SP ',
		estado: 'Fechada',
		classificacao: 'Iluminação e Energia',
		data: '23/07/2016',
		comentario: 'Fiação no chao e caótica. Continua terra de ninguem. Alem da placa entortada. ',
		imagem: 'img/128947_1468342381.jpg' }
	]

  return {
    all: function() {
      return ocorrencias;
    },
    remove: function(ocorrencia) {
      ocorrencias.splice(ocorrencias.indexOf(ocorrencia), 1);
    },
    get: function(ocorrenciaID) {
      for (var i = 0; i < ocorrencias.length; i++) {
        if (ocorrencias[i].id === parseInt(ocorrenciaID)) {
          return ocorrencias[i];
        }
      }
      return null;
    }
  };
});
