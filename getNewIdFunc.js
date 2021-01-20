module.exports = {
  getNewId: function (id) {
      if((id == null) || (id == "")){
          return "";
      }
    var splittedId = id.toString().split("_");
    var newId = splittedId[0] + "_" + (parseInt(splittedId[1]) + 1).toString();
    return newId;
  },
};
