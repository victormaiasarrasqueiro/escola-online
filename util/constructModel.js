
function setBasicInfoInsert(model,req){

	model.idEmp = req.decoded.idEmp;
	model.ieAtv = true;
	model.idUcd = req.decoded.idUsu;
	model.dtCad = new Date();
	model.idUuu = null;
	model.dtCuu = null;
	model.idUrc = null;
	model.dtCrc = null;

	return model;
};

function setBasicInfoDelete(model,req){

	model.ieAtv = false;
	model.idUrc = req.decoded.idUsu;
	model.dtCrc = new Date();

	return model;
};

function setBasicInfoUpdate(model,req){

	model.ieAtv = true;
	model.idUuu = req.decoded.idUsu;
	model.dtCuu = new Date();

	return model;
};


module.exports =  {
  
  setBasicInfoInsert:setBasicInfoInsert,
  setBasicInfoDelete:setBasicInfoDelete,
  setBasicInfoUpdate:setBasicInfoUpdate

};