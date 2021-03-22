--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Favorite_restaurants; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public."Favorite_restaurants" (
    user_client_id integer NOT NULL,
    user_restaurant_id integer NOT NULL
);


ALTER TABLE public."Favorite_restaurants" OWNER TO gitpod;

--
-- Name: User_client; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public."User_client" (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(120) NOT NULL,
    password character varying(255) NOT NULL,
    is_active boolean NOT NULL
);


ALTER TABLE public."User_client" OWNER TO gitpod;

--
-- Name: User_client_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public."User_client_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_client_id_seq" OWNER TO gitpod;

--
-- Name: User_client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public."User_client_id_seq" OWNED BY public."User_client".id;


--
-- Name: User_restaurant; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public."User_restaurant" (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(120) NOT NULL,
    password character varying(255) NOT NULL,
    image_url character varying(250),
    address character varying(100) NOT NULL,
    phone character varying(50) NOT NULL,
    category character varying(50) NOT NULL,
    welcome_message character varying(50) NOT NULL,
    description character varying(400) NOT NULL,
    is_active boolean NOT NULL
);


ALTER TABLE public."User_restaurant" OWNER TO gitpod;

--
-- Name: User_restaurant_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public."User_restaurant_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_restaurant_id_seq" OWNER TO gitpod;

--
-- Name: User_restaurant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public."User_restaurant_id_seq" OWNED BY public."User_restaurant".id;


--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO gitpod;

--
-- Name: review; Type: TABLE; Schema: public; Owner: gitpod
--

CREATE TABLE public.review (
    id integer NOT NULL,
    user_client_id integer NOT NULL,
    user_restaurant_id integer NOT NULL,
    comment character varying,
    rating integer NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.review OWNER TO gitpod;

--
-- Name: review_id_seq; Type: SEQUENCE; Schema: public; Owner: gitpod
--

CREATE SEQUENCE public.review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_id_seq OWNER TO gitpod;

--
-- Name: review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gitpod
--

ALTER SEQUENCE public.review_id_seq OWNED BY public.review.id;


--
-- Name: User_client id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."User_client" ALTER COLUMN id SET DEFAULT nextval('public."User_client_id_seq"'::regclass);


--
-- Name: User_restaurant id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."User_restaurant" ALTER COLUMN id SET DEFAULT nextval('public."User_restaurant_id_seq"'::regclass);


--
-- Name: review id; Type: DEFAULT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.review ALTER COLUMN id SET DEFAULT nextval('public.review_id_seq'::regclass);


--
-- Data for Name: Favorite_restaurants; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public."Favorite_restaurants" (user_client_id, user_restaurant_id) FROM stdin;
\.


--
-- Data for Name: User_client; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public."User_client" (id, name, email, password, is_active) FROM stdin;
5	Kevin Pitti	kepc08@gmail.com	pbkdf2:sha256:150000$GmmShFIq$1a955e296d673f26c38192be2344263a003f17943c5f3676e1b09961d593924f	t
6	José Jara	jose@gmail.com	pbkdf2:sha256:150000$F1eNxcdf$bf710285f2c2b01e0862db37fad01b19c3e35c6d922d9d3546f607c00c4c4f06	t
7	Cris Sevilla	cris@gmail.com	pbkdf2:sha256:150000$W5bpujdc$832760b7f7dafb8deaf2a2564664515245eae2e0b0ce3206dd43d84c6aa9ed35	t
8	Allan Castillo	allan@gmail.com	pbkdf2:sha256:150000$4pEMAG5B$97f0a6b09298d03514e6cd90ce3d881704ed6979e2d55b6bafa435735fda95c2	t
\.


--
-- Data for Name: User_restaurant; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public."User_restaurant" (id, name, email, password, image_url, address, phone, category, welcome_message, description, is_active) FROM stdin;
9	Grano De Oro	Oro@gmail.com	pbkdf2:sha256:150000$wCDPoT8D$b1ea36298b70deff3ae7dca4d51eff62e58bf6d38f47f67d73ced2dea7a51315	https://res.cloudinary.com/doaoxn1po/image/upload/v1616437620/img-restaurants/u991z84ahg6apblierfy.jpg	San José, Costa Rica	+50611235813	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	t
10	Pimento	Pimento@gmail.com	pbkdf2:sha256:150000$e4QCLnuO$c652376b539bc623b661bab22dd656634f4a7162e1f9549264a8718e0d792aae	https://res.cloudinary.com/doaoxn1po/image/upload/v1616437815/img-restaurants/zp8l63lgxwees5hwixcc.jpg	San José, Costa Rica	+50611235813	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	t
11	Gallo Rojo	Gallo@gmail.com	pbkdf2:sha256:150000$7wSNJgJ5$bf12ef981f1439db85fac46a30ff6824e6fc281176ed32f0d4ea992fd09a7900	https://res.cloudinary.com/doaoxn1po/image/upload/v1616438088/img-restaurants/c9bw4hmqsjeh7qwfosvt.jpg	San José, Costa Rica	+50611235813	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	t
6	Jürgens	Jürgens@gmail.com	pbkdf2:sha256:150000$kNQ6X9pb$fbba80e0e79e39784d0953193461a98332fc1436bd497203525575e7b055a6b5	https://res.cloudinary.com/doaoxn1po/image/upload/v1616436908/img-restaurants/etzxvlv9u4liquloaob9.jpg	San José, Costa Rica	+50611235813	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	t
7	La Terrasse	Terrasse@gmail.com	pbkdf2:sha256:150000$QDcCIgTJ$95fe7e24e7b4e5cb777d5a17bb8d70f53b8d5743cb92e74aae7d719b578408b1	https://res.cloudinary.com/doaoxn1po/image/upload/v1616437219/img-restaurants/qo3zdnouydzkghclv0xs.png	San José, Costa Rica	+50611235813	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	t
8	The Market	Market@gmail.com	pbkdf2:sha256:150000$isMaHPqL$7ce4fbba6ddfd351261ff6d1a8dd07ec91851c6cf16d5205831e9dbb1d49accc	https://res.cloudinary.com/doaoxn1po/image/upload/v1616437396/img-restaurants/jhxgfi5ksfmytfcklefu.png	San José, Costa Rica	+50611235813	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	t
12	Tin Jo	TinJo@gmail.com	pbkdf2:sha256:150000$kHh5NyEo$0ce70bb4fb2756f27e48281a7be5404dbed1e8c231f5337883902fda965ac0f5	https://res.cloudinary.com/doaoxn1po/image/upload/v1616438412/img-restaurants/gwfajwfpgogcckhne7i7.jpg	San José, Costa Rica	+50611235813	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	t
13	MIXT	MIXT@gmail.com	pbkdf2:sha256:150000$4fnlqNL7$10bf5a33c94284789f3ac4d53f36b14f34f890164b4138606f25fa86594b4e11	https://res.cloudinary.com/doaoxn1po/image/upload/v1616438541/img-restaurants/kda98zt1ilvcjmxn3dze.jpg	San José, Costa Rica	+50611235813	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	t
14	Exotica	Exotica@gmail.com	pbkdf2:sha256:150000$eihtk9FG$a361a97f08716bd22b5058e8f297de6bcca9afa20b7e025bde49d05b719e74af	https://res.cloudinary.com/doaoxn1po/image/upload/v1616438751/img-restaurants/dfqzyi61nbiwxotgpmsz.png	San José, Costa Rica	+50611235813	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	t
\.


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.alembic_version (version_num) FROM stdin;
6ca5c0cad220
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: gitpod
--

COPY public.review (id, user_client_id, user_restaurant_id, comment, rating, date) FROM stdin;
1	8	9	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis.	4	2021-03-22 18:49:25.458745
2	8	10	Lorem ipsum dolor sit amet, consectetur adipiscing	5	2021-03-22 18:49:51.724984
3	8	11	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	3	2021-03-22 18:50:15.089562
4	8	6	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus.	1	2021-03-22 18:52:48.875981
5	8	7	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus.	5	2021-03-22 18:55:25.63356
6	8	8	Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...	2	2021-03-22 18:56:10.066728
7	7	9	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	5	2021-03-22 19:00:53.608328
8	7	10	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	3	2021-03-22 19:01:15.020584
9	7	14	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	1	2021-03-22 19:01:42.935325
10	7	13	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	3	2021-03-22 19:02:28.539855
11	7	12	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	5	2021-03-22 19:02:43.113651
12	6	14	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien.	3	2021-03-22 19:03:30.832405
13	6	13	Lorem ipsum dolor sit amet, consectetur adipiscing	2	2021-03-22 19:04:03.239952
14	6	8	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet vestibulum sapien. Proin pharetra neque felis, ac condimentum elit efficitur ut. Aliquam porttitor, tortor sed laoreet scelerisque, ipsum mi fermentum ex, id efficitur dolor nisl non lectus. Mauris dictum aliquam luctus. Nam ac metus nibh. Etiam accumsan nisl vel turpis dignissim ullamcorper id nec sapien. 	3	2021-03-22 19:04:23.465842
15	6	6	Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...	3	2021-03-22 19:04:47.213091
16	6	9	Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...	3	2021-03-22 19:05:10.377042
\.


--
-- Name: User_client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public."User_client_id_seq"', 8, true);


--
-- Name: User_restaurant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public."User_restaurant_id_seq"', 14, true);


--
-- Name: review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gitpod
--

SELECT pg_catalog.setval('public.review_id_seq', 16, true);


--
-- Name: Favorite_restaurants Favorite_restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."Favorite_restaurants"
    ADD CONSTRAINT "Favorite_restaurants_pkey" PRIMARY KEY (user_client_id, user_restaurant_id);


--
-- Name: User_client User_client_email_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."User_client"
    ADD CONSTRAINT "User_client_email_key" UNIQUE (email);


--
-- Name: User_client User_client_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."User_client"
    ADD CONSTRAINT "User_client_pkey" PRIMARY KEY (id);


--
-- Name: User_restaurant User_restaurant_email_key; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."User_restaurant"
    ADD CONSTRAINT "User_restaurant_email_key" UNIQUE (email);


--
-- Name: User_restaurant User_restaurant_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."User_restaurant"
    ADD CONSTRAINT "User_restaurant_pkey" PRIMARY KEY (id);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- Name: Favorite_restaurants Favorite_restaurants_user_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."Favorite_restaurants"
    ADD CONSTRAINT "Favorite_restaurants_user_client_id_fkey" FOREIGN KEY (user_client_id) REFERENCES public."User_client"(id);


--
-- Name: Favorite_restaurants Favorite_restaurants_user_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public."Favorite_restaurants"
    ADD CONSTRAINT "Favorite_restaurants_user_restaurant_id_fkey" FOREIGN KEY (user_restaurant_id) REFERENCES public."User_restaurant"(id);


--
-- Name: review review_user_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_user_client_id_fkey FOREIGN KEY (user_client_id) REFERENCES public."User_client"(id);


--
-- Name: review review_user_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gitpod
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_user_restaurant_id_fkey FOREIGN KEY (user_restaurant_id) REFERENCES public."User_restaurant"(id);


--
-- PostgreSQL database dump complete
--

