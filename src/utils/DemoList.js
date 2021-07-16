export default{
     Generic_List : [
        {
          id: 1,
          actionLink: "",
          value: "Hip-Hop",
        },
        {
          id: 2,
          actionLink: "",
          value: "Freestyle",
        },
        {
          id: 3,
          actionLink: "",
          value: "Mexico",
        },
        {
          id: 4,
          actionLink: "",
          value: "Mex Type",
        },
        {
          id: 5,
          actionLink: "",
          value: "House",
        },
        {
            id: 6,
            actionLink: "",
            value: "Salsa",
          },
          {
            id: 7,
            actionLink: "",
            value: "Party",
          },
    ]
    




    
} 

export const Job_status = (id) => {
    switch (id) {
      case 1:
        return "Job in progress";
      case 2:
        return "Job in query";
      case 3:
        return "Job complete";
      case 4:
        return "Job under review";
      case 5:
        return "Job not started";
      default:
        return id;
    }
  };

      {/* <select className="form-control mb-3">
                                                    <option selected>Select Categorie</option>
                                                    <option value="Hip-Hop">Hip-Hop</option>
                                                    <option value="Freestyle">Freestyle</option>
                                                    <option value="Mexico">Mexico</option>
                                                    <option value="Mex Type">Mex Type</option>
                                                    <option value="House">House</option>
                                                    <option value="Salsa">Salsa</option>
                                                    <option value="Party">Party</option>
                                                </select> */}