# PawPortal Architecture & System Overview

## Mermaid Diagrams

### 1. System Architecture Overview

```mermaid
graph TB
    subgraph "Frontend (React)"
        A[React Application] --> B[Components]
        A --> C[Pages]
        A --> D[Context/State]
        A --> E[Services/API]
        B --> F[Navbar]
        B --> G[Chatbot]
        B --> H[NotificationManager]
        C --> I[Authentication Pages]
        C --> J[Dashboard Pages]
        C --> K[Feature Pages]
        E --> L[API Service]
        E --> M[Auth Service]
        E --> N[Socket Service]
    end

    subgraph "Backend (Node.js/Express)"
        O[Express Server] --> P[Routes]
        O --> Q[Controllers]
        O --> R[Middleware]
        O --> S[Socket.IO]
        P --> T[Auth Routes]
        P --> U[Pet Routes]
        P --> V[Event Routes]
        P --> W[Forum Routes]
        P --> X[Lost Found Routes]
        Q --> Y[Auth Controller]
        Q --> Z[Pet Controller]
        Q --> AA[Event Controller]
        R --> AB[JWT Auth]
        R --> AC[Role Based Access]
        R --> AD[Error Handler]
    end

    subgraph "Database (TiDB/MySQL)"
        AE[(Database)] --> AF[Users Table]
        AE --> AG[Pets Table]
        AE --> AH[Events Table]
        AE --> AI[Forum Tables]
        AE --> AJ[Lost Found Table]
        AE --> AK[FAQs Table]
        AE --> AL[Notifications Table]
    end

    subgraph "External Services"
        AM[Cloudinary] --> AN[Image Storage]
        AO[Socket.IO] --> AP[Real-time Chat]
    end

    L --> O
    N --> S
    O --> AE
    Q --> AM
    S --> AO

    style A fill:#61dafb
    style O fill:#339933
    style AE fill:#4479a1
    style AM fill:#3448c5
```

### 2. User Roles & Access Control

```mermaid
graph LR
    A[User] --> B{Authentication}
    B -->|Login| C[Role Assignment]
    C --> D[Pet Owner]
    C --> E[Shelter Admin]
    C --> F[Moderator]
    C --> G[System Admin]

    D --> D1[Pet Management]
    D --> D2[Adoption Browse]
    D --> D3[Community Access]
    D --> D4[Services Access]

    E --> E1[Pet Management]
    E --> E2[Adoption Requests]
    E --> E3[Staff Management]
    E --> E4[Event Organization]
    E --> E5[Shelter Analytics]

    F --> F1[Content Moderation]
    F --> F2[Post Review]
    F --> F3[Report Review]
    F --> F4[User Management]
    F --> F5[Moderator Analytics]

    G --> G1[All User Management]
    G --> G2[Role Management]
    G --> G3[System Logs]
    G --> G4[System Analytics]
    G --> G5[FAQ Management]
    G --> G6[Full System Access]

    style D fill:#4CAF50
    style E fill:#2196F3
    style F fill:#FF9800
    style G fill:#F44336
```

### 3. Feature Flow Diagram

```mermaid
flowchart TD
    Start([User Visits PawPortal]) --> Auth{Authenticated?}
    Auth -->|No| Login[Login/Register]
    Auth -->|Yes| Dashboard[Dashboard]
    
    Login --> Dashboard
    
    Dashboard --> FeatureSelect{Select Feature}
    
    FeatureSelect -->|Pet Adoption| AdoptionFlow[Pet Adoption Flow]
    FeatureSelect -->|Pet Management| PetMgmtFlow[Pet Management Flow]
    FeatureSelect -->|Healthcare| HealthFlow[Healthcare Flow]
    FeatureSelect -->|Services| ServicesFlow[Services Flow]
    FeatureSelect -->|Community| CommunityFlow[Community Flow]
    FeatureSelect -->|Lost & Found| LostFoundFlow[Lost & Found Flow]
    
    AdoptionFlow --> Browse[Browse Pets]
    Browse --> Filter[Filter/Search]
    Filter --> PetDetail[View Pet Details]
    PetDetail --> Adopt[Adopt Now]
    Adopt --> Request[Adoption Request]
    Request --> Approval{Approval Process}
    Approval -->|Approved| Success[Adoption Successful]
    Approval -->|Rejected| Rejected[Request Rejected]
    
    PetMgmtFlow --> MyPets[My Pets]
    MyPets --> AddPet[Add Pet]
    MyPets --> EditPet[Edit Pet]
    MyPets --> ViewAnalytics[Pet Analytics]
    
    HealthFlow --> HealthDash[Health Dashboard]
    HealthDash --> Records[Health Records]
    HealthDash --> Reminders[Care Reminders]
    HealthDash --> VetBook[Book Vet]
    
    ServicesFlow --> VetBooking[Vet Booking]
    ServicesFlow --> Insurance[Insurance Comparison]
    ServicesFlow --> Trainers[Find Trainers]
    ServicesFlow --> Walkers[Hire Pet Walker]
    
    CommunityFlow --> Forums[Community Forums]
    CommunityFlow --> Events[Events]
    Forums --> CreatePost[Create Post]
    Forums --> ViewThread[View Thread]
    Events --> Register[Register for Event]
    Events --> Chat[Event Discussion Chat]
    
    LostFoundFlow --> BrowseLF[Browse Lost/Found]
    LostFoundFlow --> Report[Report Lost/Found]
    Report --> RFIDMatch{RFID Match?}
    RFIDMatch -->|Match Found| Notify[Notify Owner]
    RFIDMatch -->|No Match| PostCreated[Post Created]
    
    style Start fill:#e1f5ff
    style Dashboard fill:#fff4e1
    style Success fill:#c8e6c9
    style Rejected fill:#ffcdd2
```

### 4. Data Flow - Pet Adoption Process

```mermaid
sequenceDiagram
    participant U as User/Pet Owner
    participant F as Frontend
    participant B as Backend API
    participant D as Database
    participant S as Shelter Admin
    participant N as Notification Service

    U->>F: Browse Pet Listings
    F->>B: GET /api/pets
    B->>D: Query Pets Table
    D-->>B: Return Pet List
    B-->>F: Pet Data
    F-->>U: Display Pets

    U->>F: Click on Pet
    F->>B: GET /api/pets/:id
    B->>D: Query Pet Details
    D-->>B: Pet Details
    B-->>F: Pet Info + Images
    F-->>U: Show Pet Detail Page

    U->>F: Click "Adopt Now"
    F->>B: POST /api/adoption-requests
    B->>D: Create Adoption Request
    D-->>B: Request Created
    B->>N: Send Notification to Shelter
    N->>S: Notify Shelter Admin
    B-->>F: Request Submitted
    F-->>U: Show Success Message

    S->>F: View Adoption Requests
    F->>B: GET /api/adoption-requests
    B->>D: Query Requests
    D-->>B: Request List
    B-->>F: Requests Data
    F-->>S: Display Requests

    S->>F: Approve/Reject Request
    F->>B: PUT /api/adoption-requests/:id
    B->>D: Update Request Status
    B->>N: Send Notification to User
    N->>U: Notify User
    D-->>B: Updated
    B-->>F: Success
    F-->>S: Show Updated Status
```

### 5. Real-time Features (Socket.IO)

```mermaid
graph TB
    subgraph "Client Side"
        A[React App] --> B[Socket Service]
        B --> C[Event Listeners]
    end

    subgraph "Server Side"
        D[Express Server] --> E[Socket.IO Server]
        E --> F[Event Handlers]
        F --> G[Room Management]
        F --> H[Message Broadcasting]
    end

    subgraph "Events"
        I[Event Discussion]
        J[Real-time Chat]
        K[Notifications]
        L[Live Updates]
    end

    B <-->|WebSocket Connection| E
    C --> I
    C --> J
    C --> K
    C --> L
    
    F --> I
    F --> J
    F --> K
    F --> L

    G --> M[Event Rooms]
    G --> N[User Rooms]
    
    H --> O[Broadcast to Room]
    H --> P[Broadcast to User]

    style A fill:#61dafb
    style E fill:#010101
    style I fill:#4CAF50
    style J fill:#2196F3
```

### 6. FAQ Chatbot Flow

```mermaid
flowchart TD
    Start([User Opens Chatbot]) --> Input[User Input Question]
    Input --> Process[Process Query]
    Process --> Extract[Extract Keywords]
    Extract --> Match[Match with FAQs]
    Match --> Similarity{Similarity Check}
    Similarity -->|High Match| ReturnFAQ[Return FAQ Answer]
    Similarity -->|Low Match| Default[Return Default Response]
    ReturnFAQ --> Log[Log Query]
    Default --> Log
    Log --> Feedback{User Feedback}
    Feedback -->|Helpful| Update[Update FAQ Stats]
    Feedback -->|Not Helpful| Escalate[Escalate to Admin]
    Update --> End([End])
    Escalate --> End

    style Start fill:#e1f5ff
    style ReturnFAQ fill:#c8e6c9
    style Default fill:#fff4e1
```

### 7. RFID Matching System

```mermaid
flowchart TD
    Start([Report Found Pet]) --> Input[Enter RFID Number]
    Input --> Check{Check Database}
    Check -->|RFID Exists| Match[Match with Lost Pet]
    Check -->|No RFID| Create[Create Found Post]
    Match --> Notify[Notify Pet Owner]
    Notify --> UpdateStatus[Update Status to Resolved]
    UpdateStatus --> Connect[Connect Owner & Finder]
    Create --> Wait[Wait for Manual Match]
    Wait --> ManualMatch[Admin/User Manual Match]
    ManualMatch --> Notify

    style Start fill:#e1f5ff
    style Match fill:#c8e6c9
    style Notify fill:#4CAF50
```

### 8. Database Schema Overview

```mermaid
erDiagram
    USERS ||--o{ PETS : owns
    USERS ||--o{ ADOPTION_REQUESTS : makes
    USERS ||--o{ FORUM_POSTS : creates
    USERS ||--o{ EVENT_REGISTRATIONS : registers
    USERS ||--o{ LOST_FOUND_POSTS : reports
    USERS ||--o{ NOTIFICATIONS : receives
    
    PETS ||--o{ PET_IMAGES : has
    PETS ||--o{ ADOPTION_REQUESTS : requested_for
    PETS ||--o{ HEALTH_RECORDS : has
    
    EVENTS ||--o{ EVENT_IMAGES : has
    EVENTS ||--o{ EVENT_REGISTRATIONS : has
    EVENTS ||--o{ EVENT_DISCUSSIONS : has
    
    FORUM_CATEGORIES ||--o{ FORUM_POSTS : contains
    FORUM_POSTS ||--o{ FORUM_REPLIES : has
    
    LOST_FOUND_POSTS ||--o{ RFID_MATCHES : matched_with
    
    FAQS ||--o{ FAQ_QUERY_LOGS : queried_in

    USERS {
        int id PK
        string email
        string password
        string role
        string name
        datetime created_at
    }
    
    PETS {
        int id PK
        int owner_id FK
        string name
        string breed
        string status
        text description
    }
    
    EVENTS {
        int id PK
        int created_by FK
        string title
        string category
        datetime event_date
        int participant_limit
    }
    
    FAQS {
        int id PK
        string question
        text answer
        string category
        json keywords
    }
```

### 9. API Endpoints Overview

```mermaid
graph LR
    subgraph "Authentication"
        A1[POST /api/auth/register]
        A2[POST /api/auth/login]
        A3[POST /api/auth/refresh-token]
    end

    subgraph "Pets"
        B1[GET /api/pets]
        B2[GET /api/pets/:id]
        B3[POST /api/pets]
        B4[PUT /api/pets/:id]
        B5[DELETE /api/pets/:id]
    end

    subgraph "Events"
        C1[GET /api/events]
        C2[POST /api/events]
        C3[POST /api/events/:id/register]
        C4[GET /api/events/:id/discussions]
    end

    subgraph "Forum"
        D1[GET /api/forum]
        D2[POST /api/forum]
        D3[GET /api/forum/:id]
    end

    subgraph "Lost & Found"
        E1[GET /api/lost-found]
        E2[POST /api/lost-found]
        E3[GET /api/lost-found/search/rfid]
    end

    subgraph "FAQs"
        F1[GET /api/faq]
        F2[POST /api/faq/query]
        F3[POST /api/faq]
    end

    style A1 fill:#4CAF50
    style B1 fill:#2196F3
    style C1 fill:#FF9800
    style D1 fill:#9C27B0
    style E1 fill:#F44336
    style F1 fill:#00BCD4
```

### 10. Complete System Overview

```mermaid
graph TB
    subgraph "Presentation Layer"
        A[React Frontend]
        A1[User Interface]
        A2[Components]
        A3[Pages]
        A --> A1
        A --> A2
        A --> A3
    end

    subgraph "Application Layer"
        B[Express.js Backend]
        B1[API Routes]
        B2[Controllers]
        B3[Middleware]
        B4[Services]
        B --> B1
        B --> B2
        B --> B3
        B --> B4
    end

    subgraph "Business Logic"
        C1[Authentication & Authorization]
        C2[Pet Management]
        C3[Adoption Process]
        C4[Event Management]
        C5[Community Features]
        C6[Lost & Found]
        C7[FAQ System]
        C8[Analytics]
    end

    subgraph "Data Layer"
        D[TiDB Database]
        D1[Users]
        D2[Pets]
        D3[Events]
        D4[Forum]
        D5[Lost Found]
        D6[FAQs]
        D --> D1
        D --> D2
        D --> D3
        D --> D4
        D --> D5
        D --> D6
    end

    subgraph "External Services"
        E1[Cloudinary - Image Storage]
        E2[Socket.IO - Real-time]
        E3[JWT - Authentication]
    end

    A --> B
    B1 --> C1
    B1 --> C2
    B1 --> C3
    B1 --> C4
    B1 --> C5
    B1 --> C6
    B1 --> C7
    B1 --> C8
    C1 --> D
    C2 --> D
    C3 --> D
    C4 --> D
    C5 --> D
    C6 --> D
    C7 --> D
    C8 --> D
    B --> E1
    B --> E2
    B --> E3

    style A fill:#61dafb
    style B fill:#339933
    style D fill:#4479a1
    style E1 fill:#3448c5
    style E2 fill:#010101
```

---

## Key Features Summary

### Core Features
1. **Pet Adoption** - Browse, search, and adopt pets
2. **Pet Management** - Manage pet profiles, health records, analytics
3. **Healthcare** - Health dashboard, care reminders, vet booking
4. **Services** - Vet booking, insurance, trainers, pet walkers
5. **Community** - Forums, events, discussions
6. **Lost & Found** - Report and find lost pets with RFID matching
7. **Chatbot** - AI-powered FAQ system
8. **Notifications** - Real-time notification system

### Admin Features
1. **Shelter Admin** - Manage pets, staff, events, adoption requests
2. **Moderator** - Content moderation, user management
3. **System Admin** - Complete system control, analytics, FAQ management

### Technical Features
1. **Real-time Chat** - Socket.IO for event discussions
2. **RFID Matching** - Automatic and manual pet matching
3. **Image Upload** - Cloudinary integration
4. **Role-based Access** - JWT authentication with roles
5. **Analytics** - Comprehensive analytics for all user types

---

## Technology Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: TiDB (MySQL compatible)
- **Real-time**: Socket.IO
- **Authentication**: JWT
- **File Storage**: Cloudinary
- **State Management**: React Context API

---

## How to Use These Diagrams

1. **Copy the Mermaid code** from any section above
2. **Paste into a Mermaid editor**:
   - Online: https://mermaid.live/
   - VS Code: Install "Markdown Preview Mermaid Support" extension
   - GitHub: Mermaid diagrams render automatically in markdown files
3. **Export as image** (PNG, SVG) from the editor
4. **Use in presentations** or documentation

---

## Notes

- All diagrams are written in Mermaid syntax
- You can modify colors, styles, and connections as needed
- Diagrams can be combined or separated based on your needs
- Some diagrams show simplified flows - actual implementation may have more steps

