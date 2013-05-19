
CREATE TABLE bookmark (
    id integer NOT NULL,
    name character varying(255),
    url character varying(255),
    description character varying(255),
    created timestamp without time zone DEFAULT now(),
    updated timestamp without time zone DEFAULT now()
);

CREATE SEQUENCE bookmark_pk_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE ONLY bookmark
    ADD CONSTRAINT bookmark_pkey PRIMARY KEY (id);

