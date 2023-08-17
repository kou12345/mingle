CREATE TABLE hoges (
    id uuid default uuid_generate_v4() primary key,
    content text
);

ALTER TABLE hoges ENABLE ROW LEVEL SECURITY;

INSERT INTO hoges (id, content)
VALUES
    ('64c8242e-ed6f-44a1-94e3-1a25df96f10f','aaaa'),
    ('2b794635-0f43-4d82-9391-0f6bec10b04b','bbbb'),
    ('7f0898c0-d894-40b3-8e69-b77e3dbcbbad','cccc'),
    ('1bfb9b93-e9c2-4278-828d-5294c383102d','dddd');
