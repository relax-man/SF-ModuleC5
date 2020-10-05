const inputPage = document.getElementById("inputPage");
const inputLimit = document.getElementById("inputLimit");
const btn = document.getElementById("btnRequest");
const resultField = document.getElementById("resultField");

function makeRequest(page, limit) {
  return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((response) => {return response.json()})
    .catch((error) => {console.log(error)})
}

function createGallery(data) {

  let pics = `<div class="gallery">`;

  data.forEach(item => {
    const pic = `
      <div
        class="gallery-img"
        style="background-image: url(${item.download_url});">
      </div>
    `;
    pics += pic;
  });

  pics += `</div>`;
  resultField.innerHTML = pics;

  localStorage.setItem("getapi-info", JSON.stringify(data));
}

btn.addEventListener("click", async _ => {
  const page = Number(inputPage.value);
  const limit = Number(inputLimit.value);

  if ((page < 1 || page > 10) && (limit < 1 || limit > 10)) {
      resultField.innerHTML = `
        <div class="warning">Номер страницы и лимит вне диапазона от 1 до 10</div>
      `;
  }
  else if (page < 1 || page > 10) {
      resultField.innerHTML = `
        <div class="warning">Номер страницы вне диапазона от 1 до 10</div>
      `;
  }
  else if (limit < 1 || limit > 10) {
      resultField.innerHTML = `
        <div class="warning">Лимит вне диапазона от 1 до 10</div>
      `;
  }
  else {
    resultField.innerHTML = "";
    const requestData = await makeRequest(page, limit);
    if (requestData) {
      createGallery(requestData);
    }
  }
});

window.addEventListener("DOMContentLoaded", _ => {
    const localData = localStorage.getItem("getapi-info");
    if (localData) {
        createGallery(JSON.parse(localData));
    }
});
