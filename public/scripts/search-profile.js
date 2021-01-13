const youthView = (youth) => `

<div class="col-12">
    <div class="card">
        <h5 class="card-header"> ${youth.youth_FullName}</h5>
        <div class="card-body">
         <p class="card-text">${youth.youth_email}</p>
          <ul class="list-group">
                <li class="list-group-item">Interest One: ${youth.interestOne}</li>
                <li class="list-group-item">Interest Two: ${youth.interestTwo}</li>
                <li class="list-group-item">DoB: ${youth.youth_DoB}</li>
                <li class="list-group-item">Gender: ${youth.youth_Gender}</li>
                <li class="list-group-item">Allergies: ${youth.youth_Allergies}</li>
                <li class="list-group-item">Medicinal Requirements: ${youth.youth_MedicinalRequirements}</li>
          </ul>
 </div>
`;

const nonSearchValView = (nonSearchVal) => `
<h1 class="text-center"> Search Youths </h1>
`;

const handleClick = async () => {
    console.log("Clicked");
    const searchVal = document.querySelector('#searchInput').value;
    const youthDomRef = document.querySelector('#youthItems');
    console.info(searchVal);
    try 
    {
        let youthHtml = [];
        
        if(searchVal == "")
        {
            push(nonSearchValView);
            //this displays terribly
        }
        const ref = await fetch(`/api/search-youth/?search=${searchVal}`);
        console.log(ref);
        const searchResults = await ref.json();
        //console.log(searchResults);
        searchResults.forEach(youth => {
            youthHtml.push(youthView(youth));
        });
        youthDomRef.innerHTML = youthHtml.join("");
    } 
    catch (error) 
    {
        console.log(error);
        console.log('could not search api');
    }
}