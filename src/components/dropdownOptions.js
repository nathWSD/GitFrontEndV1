export const firstDropdownOptions = [
    { label: " Baden-Württemberg", value: "Baden-Württemberg" },
    { label: " Berlin", value: "Berlin" },
    { label: "Bremen", value: "Bremen" },
    { label: " Hamburg", value: "Hamburg" },
    { label: " Niedersachsen", value: "Niedersachsen" },
    { label: " Saarland", value: "Saarland" },
    
    // ... add more options here
  ];


  export const getDependentOptions = (selectedValue) => {
    if (selectedValue === "Baden-Württemberg") {
      return [
        { label: "Flughafen", value: "Flughafen" },
        { label: "Geislingen", value: "Geislingen" },
        { label: "Heidenheim", value: "Heidenheim" },
      ];
    } else if (selectedValue === "Berlin") {
      return [
        { label: "Hauptbahnhof", value: "Hauptbahnhof" },
        { label: "Kreuzberg", value: "Kreuzberg" },
        { label: "Flughafen", value: "Flughafen" },
      ];
    }  else if (selectedValue === "Hamburg") {
      return [
        { label: "Wilhemsburg", value: "Wilhemsburg" },
        { label: "Flughafen", value: "Flughafen" },
        { label: "Hauptbahnhof", value: "Hauptbahnhof" },
      ];
    } else if (selectedValue === "Bremen") {
      return [
        { label: "Mahndorf", value: "Mahndorf" },
        { label: "Flughafen", value: "Flughafen" },
        { label: "Hauptbahnhof", value: "Hauptbahnhof" },
      ];
    }  else if (selectedValue === "Niedersachsen") {
      return [
        { label: "Hauptbahnhof", value: "Hauptbahnhof" },
        { label: "Flughafen", value: "Flughafen" },
        { label: "Kaserne", value: "Kaserne" },
      ];
    } else if (selectedValue === "Saarland") {
      return [
        { label: "Saarbrücken", value: "Saarbrücken" },
        { label: "Hauptbahnhof", value: "Hauptbahnhof" },
        { label: "Schwalbach", value: "Schwalbach" },
      ];
    } 
      
     else {
      return [];
    }
  };
