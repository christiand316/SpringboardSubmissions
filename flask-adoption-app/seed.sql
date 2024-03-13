DROP DATABASE IF EXISTS adopt;

CREATE DATABASE adopt;

\c adopt

CREATE TABLE pets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  photo_url TEXT,
  age INT,
  notes TEXT,
  available BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO pets
  (name, species, photo_url, age, notes, available)
VALUES
  ('Buddy', 'dog', 'https://www.what-dog.net/Images/faces2/scroll002.jpg', 3, 'Incredibly friendly.', 't'),
  ('Quillbert', 'porcupine', 'http://kids.sandiegozoo.org/sites/default/files/2017-12/porcupine-quills.jpg', 4, 'Adorably spiky!', 't'),
  ('Whiskers', 'cat', 'https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-curious-in-the-garden.jpg', null, null, 't'),
  ('Professor Paws', 'cat', null, null, null, 't');
