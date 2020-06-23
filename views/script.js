class Contact {
  constructor(name, email, phone, relation) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.relation = relation;
  }
}
class AddressBook {
  constructor() {
    this.contacts = [];
  }
  add(name, email, phone, relation) {
    let myNewContact = new Contact(name, email, phone, relation);
    this.contacts.push(myNewContact);
  }
  deleteAt(index) {
    this.contacts.splice(index, 1);
  }
}

// The instances of my contact List
let myAddressBook = new AddressBook();
myAddressBook.add(
  "Roniya Rojan",
  "roniyarojan24@gmail.com",
  "248.202.9680",
  "Me"
);
myAddressBook.add("Nadine L", "nadinel@email.com", "248.874.8329", "Friend");
myAddressBook.add("Kobe", "kobes@email.com", "248.389.3992", "Best Friend");
myAddressBook.add("Alyssa", "Alyssa@email.com", "248.398.8392", "Friend");
myAddressBook.add("John", "john@email.com", "248.289.3892", "Friend");

function display() {
  let container = document.querySelector(`#contact-cards`);
  container.innerHTML = "";
  for (let contact of myAddressBook.contacts) {
    let card = document.createElement(`div`);
    let name = document.createElement(`p`);
    name.innerText = `Name: ${contact.name}`;
    let email = document.createElement(`p`);
    email.innerText = `Email: ${contact.email}`;
    let phone = document.createElement(`p`);
    phone.innerText = `Phone: ${contact.phone}`;
    let relation = document.createElement(`p`);
    relation.innerText = `Relation: ${contact.relation}`;
    let icon = document.createElement(`i`);
    icon.classList.add(`fas`, `fa-trash`);
    card.append(name, email, phone, relation, icon);
    container.append(card);
    card.setAttribute(`class`, `contact-box`);
  }
}

display();

// Another Method is using the "for of" loop
// counter = 0;
// for (let contact of addressBook.contacts)
// counter++;

const form = document.querySelector("form");
form.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(form);
  myAddressBook.add(
    formData.get("name"),
    formData.get("email"),
    formData.get("phone"),
    formData.get("relation")
  );
  form.reset();
  display();
});

document
  .querySelector("#contact-cards")
  .addEventListener("click", deleteContact);

function deleteContact(e) {
  if (e.target.classList.contains("fa-trash")) {
    const index = e.target.getAttribute("data-index-number");
    console.log(index);
    myAddressBook.deleteAt(index);
    display();
  }
}
