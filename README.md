# Quiz Web-App

Eine interaktive Quiz-Anwendung mit 20 Fragen, von denen zufällig 10 pro Durchgang ausgewählt werden.

## Features

- ✅ 10 zufällige Fragen aus 20-Fragen-Pool
- ✅ Multiple-Choice mit direktem Feedback
- ✅ Navigation zwischen Fragen (Zurück/Weiter)
- ✅ Animierte Scorebar mit Farbkodierung
- ✅ Konfettiregen bei Ergebnisanzeige
- ✅ Detailansicht aller Antworten
- ✅ Responsive Design für alle Geräte
- ✅ Vollständig clientseitig (keine Datenspeicherung)
- ✅ Fehlerbehandlung für JSON-Loading
- ✅ Touch-optimiert (44px Mindestgröße)

## Anforderungen erfüllt

Alle 10 funktionalen Anforderungen aus `quiz_anforderungen.md` wurden implementiert:

1. ✅ Quiz starten mit 10 zufälligen Fragen
2. ✅ Multiple-Choice mit Radiobuttons
3. ✅ Navigation mit Zurück/Weiter + Fortschrittsanzeige
4. ✅ Animierte Scorebar mit Konfetti und Details
5. ✅ JSON-Fragenbasis mit definierter Struktur
6. ✅ Antworten-Shuffling pro Frage
7. ✅ Online-Betrieb (keine Offline-Unterstützung nötig)
8. ✅ Responsive Design für alle Geräte
9. ✅ Fehlerbehandlung mit Fallback-Meldung
10. ✅ Keine Datenspeicherung (vollständig anonym)

## Installation und Start

### Lokale Entwicklung

```bash
cd quiz-app
npm install
npm start
```

Öffnet die App auf http://localhost:3000

### Production Build

```bash
npm run build
npm run serve
```

### Docker

```bash
# Mit Docker Compose
docker-compose up --build

# Oder direkt mit Docker
docker build -t quiz-app .
docker run -p 3000:80 quiz-app
```

Die App ist dann verfügbar auf http://localhost:3000

## Projektstruktur

```
quiz-app/
├── public/
│   └── questions.json          # 20 Quiz-Fragen
├── src/
│   ├── components/
│   │   ├── StartScreen.tsx     # Startbildschirm
│   │   ├── Question.tsx        # Fragenansicht
│   │   ├── Results.tsx         # Ergebnisanzeige
│   │   └── ErrorScreen.tsx     # Fehlerbehandlung
│   ├── types/
│   │   └── Quiz.ts            # TypeScript Typen
│   ├── utils/
│   │   └── quizUtils.ts       # Quiz-Logik
│   ├── App.tsx                # Hauptkomponente
│   └── App.css                # Styling
├── Dockerfile
├── docker-compose.yml
└── nginx.conf                 # Nginx Konfiguration
```

## Technische Details

- **Framework**: React 18 with TypeScript
- **Styling**: CSS mit Flexbox/Grid, responsive Design
- **Animation**: CSS Transitions + canvas-confetti
- **State Management**: React useState/useEffect
- **Build**: Create React App
- **Deployment**: Docker mit Nginx
- **Kompatibilität**: Moderne Browser (ES6+)

## Browser-Kompatibilität

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile Browser (iOS Safari, Chrome Mobile)
