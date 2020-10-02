const fs = require("fs");
// console.log(fs);

const path = require("path");
// console.log(path);

const contactsPath = require("./db/contacts.json");
// console.log(contactsPath);

function listContacts() {
  const contacts = contactsPath.map((contact) => contact);
  return contacts;
}
console.log(listContacts());

function getContactById(contactId) {
  return contactsPath.find((contact) => contact.id === contactId);
}
console.log(getContactById(9));

function removeContact(contactId) {
  return contactsPath.filter((contact) => contact.id !== contactId);
}
console.log(removeContact(10));

function addContact(name, email, phone) {
  const contact = {
    id: contactsPath.length ? [...contactsPath].pop().id + 1 : 1,
    name,
    email,
    phone,
  };
  return contactsPath.push(contact);
}
console.log(addContact("Anna", "pillow@gmail.com", "(050)545-0652"));

module.exports = listContacts();
