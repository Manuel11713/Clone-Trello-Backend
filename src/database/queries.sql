CREATE TABLE tables(
    _TablesID BIGSERIAL PRIMARY KEY,
    nameTable VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE lists(
    _ListID BIGSERIAL PRIMARY KEY,
    nameList VARCHAR(50) NOT NULL,
    _TablesID BIGINT REFERENCES tables(_TablesID)
);

CREATE TABLE cards(
    _CardID BIGSERIAL PRIMARY KEY,
    nameCard VARCHAR(50) NOT NULL,
    _ListID BIGINT REFERENCES lists(_ListID)
);

ALTER TABLE lists
DROP CONSTRAINT lists__tablesid_fkey,
ADD CONSTRAINT lists__tablesid_fkey
FOREIGN KEY (_tablesid)
REFERENCES tables(_tablesid)
ON DELETE CASCADE;

SELECT * FROM person 
INNER JOIN tables ON person._id=tables._personid
INNER JOIN lists ON tables._tablesid=lists._tablesid
INNER JOIN cards ON lists._listid=cards._listid
WHERE email='gordito@gmail.com';