--
-- PostgreSQL database dump
--

-- Dumped from database version 9.1.9
-- Dumped by pg_dump version 9.1.9
-- Started on 2013-05-19 23:36:54 NZST

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

ALTER TABLE ONLY public.bookmark DROP CONSTRAINT bookmark_pkey;
DROP SEQUENCE public.bookmark_pk_sequence;
DROP TABLE public.bookmark;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 1894 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 163 (class 3079 OID 11676)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 1895 (class 0 OID 0)
-- Dependencies: 163
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_with_oids = false;

--
-- TOC entry 161 (class 1259 OID 16385)
-- Dependencies: 1885 1886 5
-- Name: bookmark; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE bookmark (
    id integer NOT NULL,
    name character varying(255),
    url character varying(255),
    description character varying(255),
    created timestamp without time zone DEFAULT now(),
    updated timestamp without time zone DEFAULT now()
);


--
-- TOC entry 162 (class 1259 OID 16395)
-- Dependencies: 5
-- Name: bookmark_pk_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE bookmark_pk_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 1888 (class 2606 OID 16394)
-- Dependencies: 161 161 1890
-- Name: bookmark_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY bookmark
    ADD CONSTRAINT bookmark_pkey PRIMARY KEY (id);


-- Completed on 2013-05-19 23:36:55 NZST

--
-- PostgreSQL database dump complete
--

