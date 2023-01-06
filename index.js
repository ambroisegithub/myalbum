const Image_collection = document.getElementById('collection_pictures');
const Image_form = document.getElementById('form');
const Imagecombination = document.getElementById('combinations');
const frame_image = document.getElementById('frame_image');
let Unique;
let combinations = [];
showpost();
Image_collection.addEventListener('submit', (e) => {
  e.preventDefault();
  const names = Image_collection.name.value;
  const description = Image_collection.description.value;
  const thumbnail = Image_collection.thumbnail.files[0];
  if (!thumbnail) return alert('No Image selected.');
  const reader = new FileReader();
  reader.readAsDataURL(thumbnail),
    reader.addEventListener(
      'load',
      () => {
        combinations.push({
            Unique: Date.now(),
          name: names,
          description: description,
          thumbnail: reader.result,
          storage: [],
        });
        showpost();
        Image_collection.name.value = '';
        Image_collection.description.value = '';
        Image_collection.thumbnail.value = '';
      },
      false
    );
});

Image_form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!Unique) alert('select the show collection if you want to add image in the collection');
  const Allpicture = Image_form.picture.files[0];
  if (!Allpicture) {
    alert('Please select to add an image');
  } else {
    const reader = new FileReader();
    reader.readAsDataURL(Allpicture),
      (reader.onload = () => {
        combinations = combinations.map((columnImage) => {
          if (columnImage.Unique == Unique) {
            columnImage.storage.push({
                Unique: Date.now(),
              image: reader.result,
            });
          }
          return columnImage;
        });
        showpost();
        Image_form.picture.value = '';
        Unique="";
      });
  }
});
function showCollection(columnUnique) {
    Unique = columnUnique;
  const collection_pictures = combinations.find((columnImage) => columnImage.Unique == columnUnique);
  frame_image.innerHTML = `

      <h2 style="text-align:center" class="img1">${collection_pictures.name} Images Collection View each by slides arrows</h2>
<div class="mastercontainer">
  <div class="container">
      ${collection_pictures.storage
        .map(
          (Allpicture, index) =>
            "<div class='allslides'><div class='numbertext'>" +
            "</div><img src='" +
            Allpicture.image+
            "' style='width:100%'><button onclick='DeleteImage(" +
            Allpicture.Unique +
            ")' style='margin: 0px; border-radius: 0px;' class='red'>Delete image</button></div>"
        )
        .join('')}

      <a class="prev" onclick="addSlides(-1)">❮</a>
      <a class="next" onclick="addSlides(1)">❯</a>
  </div>
  </div>`;
  showSlides(0);
}

function deleteCollection(Unique) {
  combinations = combinations.filter((columnImage) => columnImage.Unique != Unique);
  showpost();
}
function DeleteImage(pictureUnique) {
  combinations = combinations.map((columnImage) => {
    if (columnImage.Unique == Unique) {
        columnImage.storage = columnImage.storage.filter((Allpicture) =>Allpicture.Unique != pictureUnique);
    }
    return columnImage;
  });
  showpost();
  frame_image.innerHTML = '';
}
function showpost() {
  let result = '';
  combinations.forEach((column) => {
    result += `<div class="containerz"><div class="collection_pictures">
              <img src="${column.thumbnail}"/>
                  <div>
                      <h3>${column.name}</h3>
                      <p>${column.description}</p>
                      <button onclick="showCollection(${column.Unique})">Show collection</button>
                      <button onclick="deleteCollection(${column.Unique})" >Delete collection</button>
                  </div>
              </div>
              </div>`;
  });
  Imagecombination.innerHTML = result;
}

let Index = 1;

function addSlides(number) {
  showSlides((Index += number));
}

function NewSlides(number) {
  showSlides((Index = number));
}

function showSlides(number) {
  let i;
  let allslides = document.getElementsByClassName('allslides');
  let captionText = document.getElementById('caption');
  if (number > allslides.length) {
    Index = 1;
  }
  if (number < 1) {
    Index = allslides.length;
  }
  for (i = 0; i < allslides.length; i++) {
    allslides[i].style.display = 'none';
  }

  allslides[Index - 1].style.display = 'block';
}
