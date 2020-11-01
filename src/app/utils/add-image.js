import Dog from "../../assets/dog.gif";

export function AddImage() {
  const img = document.createElement('img');
  img.src = Dog;
  img.alt = 'Traumatized Dog';
  img.classList.add('img-fluid');
  const body = document.querySelector('body');
  body.appendChild(img);
}
