# System-For-Monitoring-Class-Attendance

# Struktura projekta
Imamo 4 glavna foldera (`develop` branch):
- frontend - aplikacija za frontend
- backend - aplikacija za backend
- platform - ThingsBoard platforma
- device - sve što ima veze s uređajima (ESP32 kod, virtualne skripte senzora, i sl.)

Trenutno su u njima samo README.md fajlovi. Kasnije tu dopišemo potrebne upute tipa kako pokrenut servis.

Također, jedan folder (`doc` branch):
- documentation - sva dokumentacija nek ide ovdje

## Topli savjet
Kod razvoja jedne od 4 komponenti sustava, pazite da nam se na git ne generira smeće.
Mislim na fajlove poput `.idea`, `.vscode`, `__pycache__`, i sl.

Stoga, mislim da će nam dobra praksa bit ako u svakom od 4 foldera imamo `.gitignore` file. Nisam ga dodavao
jer će se vjv sam generirat onda kada se generira inicijalna struktura projekta. Al da, pripazit na to. :')

# Branching
- imamo 3 glavne grane:
  - `main` - protected, ne merđamo ništa u nju direktno
  - `develop` - protected, ne merđamo ništa u nju direktno, kad razvijamo, radimo svoj branch i potom `Pull Request` na develop (vidi dolje za detalje)
  - `doc` - branch za dokumentaciju

# Git naredbe
Malo o gitu, ako je netko zapeo ili zaboravio pokoji trik :)

## Generalno pravilo
Sync! Sync! Sync!

Pazite da ste uvijek u toku s najsviježijim promjenama. U nastavku je opisano detaljnije, al provjerite ima li štogod novog (`git pull`) na određenom branchu
U nastavku je detaljnije opisana kuharica za razvoj featurea za one koji ju trebaju.

## Lokalni razvoj novog featurea
Recimo da krenete radit na novom featureu za dodavanje novog gumba na frontendu. Postupak razvoja ide ovako:
- syncati se sa trenutnim commitom na develop branchu, naredba: `git checkout develop` (ako niste u njoj) i potom `git pull`
- potom napraviti novi branch koji izlazi iz `develop`: `git checkout -b feature-new-button`
- raditi na tom branchu lokalno...
- kada ste gotovi, napravi se pull request
  - potrebno je pushati lokalni branch na origin: `git push --set-upstream origin feature-new-button`
  - napomena: ako nakon ove gore naredbe lokalno napravite promjene, te nakon `add` i `commit` git naredbi želite pushati promjene, u tom slučaju je dovoljno samo `git push`, jer ste već linkali lokalni branch s remote branchom (to je ovo `--set-upstream`)
- otići na GitHub repo projekta, te potom na `Pull requests`
  - eventualno napisati neki kratki opis što se radilo i stisnuti na gumb `Create pull request`
  - sad čekate barem jedan approve od nekoga, pingajte pa netko baci oko na to
  - kad dobite 1 approve, moći će se napravit `merge`, provjeriti samo je li ciljani branch (`base`) postavljen na `develop`, ali trebao bi
- sada kada je mergge napravljen, lokalno otići u branch `develop`: `git checkout develop` i napraviti pull: `git pull`

# Popis poslova (Project)
- imamo tablicu poslova da lakše pratimo rad (ToDo, In Progress, Done)
- svaki posao ima barem jednu osobu koja je assignana za taj posao
  - može biti i više osoba, tipa ak treba radit povezivanje dviju komponenti (npr. IoT platformu i ESP32)
- obratit pažnju na naming poslova, započinju tagom:
  - [IoT Device] - poslovi koji se odnose na uređaje
  - [IoT Platform] - poslovi koji se odnose na ThingsBoard
  - [Web] - poslovi koji se odnose na backend i frontend
- kad krenete radit na nekom zadatku:
  - prebacite ga iz ToDo u In Progress
  - možete napravit i issue: na tom zadatku, kliknete 3 točkice, i ima opcija `Convert to issue`
    - ovo može bit korisno jer će se to onda odmah vidjeti na repozitoriju u sekciji `Issues`
    - tu onda možemo imat rasprave oko posla (tipa vidite posao koji je vezan za dogovor komunikacije između IoT platforme i backenda)
    - imate primjer posla koji je prebačen u status In Progress i za koji je kreiran `issue` na prethodno opisan način

# Finally...
- Ovo nije zatvor, nema tu neke strogoće sad. Cilj ovog je da nam bude lakše i organiziranije radit na projektu. Mislim da ako se okvirno držimo ovoga, bit će nam lakše radit na zadacima i znamo di šta i tko treba :)
- Pišite di god komentare, savjete, **pitanja**, želje i pozdrave (osim eto baš ovdje nemojte, ipak je ovo samo README haha).
