const example = async () => {
    try {
      let abc = await dbh
        .collection("Identities")
        // .where("uniqueID", "==", "123ankit456")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const { uniqueID } = doc.data();
            console.log(uniqueID);
            if(uniqueID){
              
            }
          });
        });
      // console.log(JSON.stringify(abc));
      // if (abc !== null) {
      //   console.log("its not empty");
      // }
    } catch (e) {
      console.log(e);
    }
  };