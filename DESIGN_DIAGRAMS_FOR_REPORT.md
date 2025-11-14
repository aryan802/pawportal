# PawPortal - Design Approach and Details for Project Report

## 4. Design Approach and Details

### 4.1 System Architecture

#### 4.1.1 High-Level System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser] --> B[React Application]
        B --> C[React Router]
        B --> D[React Components]
        B --> E[React Context API]
        B --> F[Axios HTTP Client]
        B --> G[Socket.IO Client]
    end

    subgraph "Presentation Layer"
        H[UI Components]
        I[Pages/Routes]
        J[State Management]
        K[API Services]
        L[WebSocket Service]
    end

    subgraph "Application Layer - Backend"
        M[Express.js Server]
        N[API Routes]
        O[Controllers]
        P[Middleware]
        Q[Services]
        R[Socket.IO Server]
    end

    subgraph "Business Logic Layer"
        S[Authentication Service]
        T[Pet Management Service]
        U[Adoption Service]
        V[Event Management Service]
        W[Forum Service]
        X[Lost & Found Service]
        Y[FAQ Service]
        Z[Notification Service]
    end

    subgraph "Data Access Layer"
        AA[Database Connection Pool]
        AB[SQL Queries]
        AC[Data Models]
    end

    subgraph "Data Storage Layer"
        AD[(TiDB Database)]
        AE[Users Table]
        AF[Pets Table]
        AG[Events Table]
        AH[Forum Tables]
        AI[Lost Found Table]
        AJ[Notifications Table]
        AK[FAQs Table]
    end

    subgraph "External Services"
        AL[Cloudinary<br/>Image Storage]
        AM[JWT<br/>Token Service]
        AN[Email Service<br/>Future]
    end

    A --> B
    B --> H
    B --> I
    B --> J
    J --> K
    K --> F
    F --> M
    G --> R
    R --> M
    M --> N
    N --> O
    N --> P
    O --> Q
    Q --> S
    Q --> T
    Q --> U
    Q --> V
    Q --> W
    Q --> X
    Q --> Y
    Q --> Z
    S --> AA
    T --> AA
    U --> AA
    V --> AA
    W --> AA
    X --> AA
    Y --> AA
    Z --> AA
    AA --> AB
    AB --> AD
    AD --> AE
    AD --> AF
    AD --> AG
    AD --> AH
    AD --> AI
    AD --> AJ
    AD --> AK
    O --> AL
    S --> AM
    Z --> AN

    style A fill:#e3f2fd
    style B fill:#61dafb
    style M fill:#339933
    style AD fill:#4479a1
    style AL fill:#3448c5
    style AM fill:#ff9800
```

#### 4.1.2 Three-Tier Architecture

```mermaid
graph TB
    subgraph "Tier 1: Presentation Tier"
        A[React Frontend Application]
        A1[User Interface Components]
        A2[Pages & Routes]
        A3[State Management]
        A4[API Client Layer]
        A --> A1
        A --> A2
        A --> A3
        A --> A4
    end

    subgraph "Tier 2: Application Tier"
        B[Express.js Backend Server]
        B1[HTTP API Endpoints]
        B2[WebSocket Server]
        B3[Business Logic Controllers]
        B4[Authentication Middleware]
        B5[Authorization Middleware]
        B6[Error Handling]
        B --> B1
        B --> B2
        B --> B3
        B --> B4
        B --> B5
        B --> B6
    end

    subgraph "Tier 3: Data Tier"
        C[TiDB Database]
        C1[Relational Database]
        C2[Data Tables]
        C3[Indexes & Constraints]
        C --> C1
        C1 --> C2
        C1 --> C3
    end

    subgraph "External Services"
        D[Cloudinary<br/>Image Storage]
        E[JWT Authentication]
        F[Socket.IO<br/>Real-time Communication]
    end

    A4 -->|HTTP/HTTPS| B1
    A4 -->|WebSocket| B2
    B3 -->|SQL Queries| C1
    B3 -->|Image Upload| D
    B4 -->|Token Validation| E
    B2 -->|Real-time Events| F

    style A fill:#61dafb
    style B fill:#339933
    style C fill:#4479a1
    style D fill:#3448c5
    style E fill:#ff9800
    style F fill:#010101
```

---

### 4.2 Design Diagrams

#### 4.2.1 Data Flow Diagram (DFD) - Level 0 (Context Diagram)

```mermaid
graph LR
    A[User] -->|Request/Data| B[PawPortal System]
    C[Shelter Admin] -->|Manage Pets/Events| B
    D[System Admin] -->|System Management| B
    E[Moderator] -->|Content Moderation| B
    
    B -->|Stored Data| F[(Database)]
    B -->|Image Storage| G[Cloudinary]
    B -->|Notifications| A
    B -->|Notifications| C
    
    style B fill:#61dafb
    style F fill:#4479a1
    style G fill:#3448c5
```

#### 4.2.2 Data Flow Diagram (DFD) - Level 1

```mermaid
flowchart TD
    A[External Entity: User] --> B1[1.0 User Authentication]
    A --> B2[2.0 Pet Management]
    A --> B3[3.0 Adoption Process]
    A --> B4[4.0 Event Management]
    A --> B5[5.0 Forum System]
    A --> B6[6.0 Lost & Found]
    A --> B7[7.0 FAQ Chatbot]
    
    B1 -->|User Credentials| D1[(D1: Users)]
    B1 -->|Token| A
    
    B2 -->|Pet Data| D2[(D2: Pets)]
    B2 -->|Pet Images| E1[Cloudinary]
    B2 -->|Pet Data| A
    
    B3 -->|Adoption Request| D3[(D3: Adoption Applications)]
    B3 -->|Notification| B8[8.0 Notification System]
    B3 -->|Request Status| A
    
    B4 -->|Event Data| D4[(D4: Events)]
    B4 -->|Registration| D5[(D5: Event Registrations)]
    B4 -->|Chat Messages| B9[9.0 Real-time Chat]
    B4 -->|Event Info| A
    
    B5 -->|Post Data| D6[(D6: Forum Posts)]
    B5 -->|Reply Data| D7[(D7: Forum Replies)]
    B5 -->|Forum Content| A
    
    B6 -->|Lost/Found Report| D8[(D8: Lost Found Posts)]
    B6 -->|RFID Match| B10[10.0 RFID Matching]
    B6 -->|Match Result| A
    
    B7 -->|Query| D9[(D9: FAQs)]
    B7 -->|Answer| A
    
    B8 -->|Notification Data| D10[(D10: Notifications)]
    B8 -->|Notification| A
    
    B9 -->|Messages| D11[(D11: Event Discussions)]
    B9 -->|Real-time Messages| A
    
    B10 -->|RFID Data| D8
    B10 -->|Match Result| B8
    
    style D1 fill:#4479a1
    style D2 fill:#4479a1
    style D3 fill:#4479a1
    style D4 fill:#4479a1
    style D5 fill:#4479a1
    style D6 fill:#4479a1
    style D7 fill:#4479a1
    style D8 fill:#4479a1
    style D9 fill:#4479a1
    style D10 fill:#4479a1
    style D11 fill:#4479a1
    style E1 fill:#3448c5
```

#### 4.2.3 Data Flow Diagram (DFD) - Level 2 (Pet Adoption Process)

```mermaid
flowchart TD
    A[User] -->|Browse Request| B1[2.1 Browse Pets]
    A -->|Search/Filter| B2[2.2 Search Pets]
    A -->|Pet Details Request| B3[2.3 View Pet Details]
    A -->|Adoption Request| B4[2.4 Submit Adoption Request]
    
    B1 -->|Query| D1[(Pets Table)]
    B1 -->|Pet List| A
    
    B2 -->|Search Query| D1
    B2 -->|Filtered Results| A
    
    B3 -->|Pet ID| D1
    B3 -->|Pet Images| D2[(Pet Images Table)]
    B3 -->|Pet Details| A
    
    B4 -->|Application Data| D3[(Adoption Applications Table)]
    B4 -->|Notification Request| B5[2.5 Send Notification]
    B4 -->|Confirmation| A
    
    B5 -->|Notification Data| D4[(Notifications Table)]
    B5 -->|Notification| C[Shelter Admin]
    
    C -->|Review Request| B6[2.6 Review Adoption Request]
    B6 -->|Update Status| D3
    B6 -->|Status Update| B5
    B5 -->|Status Notification| A
    
    style D1 fill:#4479a1
    style D2 fill:#4479a1
    style D3 fill:#4479a1
    style D4 fill:#4479a1
```

---

#### 4.2.4 Use Case Diagram

```mermaid
graph TB
    subgraph "Actors"
        A1[Guest User]
        A2[Pet Owner]
        A3[Shelter Admin]
        A4[Moderator]
        A5[System Admin]
    end

    subgraph "Authentication Use Cases"
        UC1[Register Account]
        UC2[Login]
        UC3[Logout]
        UC4[Update Profile]
        UC5[Reset Password]
    end

    subgraph "Pet Management Use Cases"
        UC6[Browse Pets]
        UC7[Search Pets]
        UC8[View Pet Details]
        UC9[Add Pet]
        UC10[Edit Pet]
        UC11[Delete Pet]
        UC12[Upload Pet Images]
        UC13[Manage Pet Health Records]
    end

    subgraph "Adoption Use Cases"
        UC14[Submit Adoption Request]
        UC15[View Adoption Status]
        UC16[Review Adoption Requests]
        UC17[Approve/Reject Adoption]
        UC18[Track Adoption History]
    end

    subgraph "Event Management Use Cases"
        UC19[Browse Events]
        UC20[Create Event]
        UC21[Register for Event]
        UC22[Cancel Event Registration]
        UC23[View Event Details]
        UC24[Participate in Event Chat]
    end

    subgraph "Forum Use Cases"
        UC25[View Forum Posts]
        UC26[Create Forum Post]
        UC27[Reply to Post]
        UC28[Moderate Posts]
        UC29[Delete Posts]
    end

    subgraph "Lost & Found Use Cases"
        UC30[Report Lost Pet]
        UC31[Report Found Pet]
        UC32[Search Lost/Found Pets]
        UC33[Match RFID]
        UC34[Update Lost/Found Status]
    end

    subgraph "FAQ Use Cases"
        UC35[Query FAQ Chatbot]
        UC36[View FAQ Answers]
        UC37[Manage FAQs]
        UC38[View FAQ Statistics]
    end

    subgraph "Administration Use Cases"
        UC39[Manage Users]
        UC40[Manage Roles]
        UC41[View Analytics]
        UC42[Manage System Settings]
        UC43[View System Logs]
    end

    subgraph "Notification Use Cases"
        UC44[View Notifications]
        UC45[Mark Notification as Read]
        UC46[Send Notifications]
    end

    %% Guest User
    A1 --> UC1
    A1 --> UC2
    A1 --> UC6
    A1 --> UC7
    A1 --> UC8
    A1 --> UC19
    A1 --> UC23
    A1 --> UC25
    A1 --> UC30
    A1 --> UC31
    A1 --> UC32
    A1 --> UC35
    A1 --> UC36

    %% Pet Owner
    A2 --> UC2
    A2 --> UC3
    A2 --> UC4
    A2 --> UC6
    A2 --> UC7
    A2 --> UC8
    A2 --> UC9
    A2 --> UC10
    A2 --> UC11
    A2 --> UC12
    A2 --> UC13
    A2 --> UC14
    A2 --> UC15
    A2 --> UC19
    A2 --> UC21
    A2 --> UC22
    A2 --> UC23
    A2 --> UC24
    A2 --> UC25
    A2 --> UC26
    A2 --> UC27
    A2 --> UC30
    A2 --> UC31
    A2 --> UC32
    A2 --> UC35
    A2 --> UC44
    A2 --> UC45

    %% Shelter Admin
    A3 --> UC2
    A3 --> UC3
    A3 --> UC9
    A3 --> UC10
    A3 --> UC11
    A3 --> UC12
    A3 --> UC16
    A3 --> UC17
    A3 --> UC18
    A3 --> UC20
    A3 --> UC23
    A3 --> UC41
    A3 --> UC44
    A3 --> UC45
    A3 --> UC46

    %% Moderator
    A4 --> UC2
    A4 --> UC3
    A4 --> UC28
    A4 --> UC29
    A4 --> UC39
    A4 --> UC41
    A4 --> UC44
    A4 --> UC45

    %% System Admin
    A5 --> UC2
    A5 --> UC3
    A5 --> UC37
    A5 --> UC38
    A5 --> UC39
    A5 --> UC40
    A5 --> UC41
    A5 --> UC42
    A5 --> UC43
    A5 --> UC44
    A5 --> UC45
    A5 --> UC46

    style A1 fill:#e3f2fd
    style A2 fill:#c8e6c9
    style A3 fill:#bbdefb
    style A4 fill:#fff9c4
    style A5 fill:#ffcdd2
```

---

#### 4.2.5 Class Diagram

```mermaid
classDiagram
    class User {
        +int id
        +string name
        +string email
        +string password_hash
        +string role
        +string phone
        +string address
        +datetime created_at
        +login()
        +register()
        +updateProfile()
        +changePassword()
    }

    class Pet {
        +int id
        +string name
        +int breed_id
        +int age_months
        +string gender
        +string size
        +string status
        +text description
        +decimal adoption_fee
        +int owner_id
        +datetime created_at
        +create()
        +update()
        +delete()
        +getDetails()
    }

    class PetBreed {
        +int id
        +string name
        +string size
        +text temperament
        +string life_expectancy
    }

    class PetImage {
        +int id
        +int pet_id
        +string image_url
        +boolean is_primary
        +string caption
        +upload()
        +delete()
    }

    class AdoptionApplication {
        +int id
        +int pet_id
        +int applicant_id
        +string status
        +json application_data
        +datetime created_at
        +submit()
        +review()
        +approve()
        +reject()
    }

    class Event {
        +int id
        +string title
        +text description
        +string event_type
        +datetime start_date
        +datetime end_date
        +int max_attendees
        +int organizer_id
        +create()
        +update()
        +delete()
        +registerUser()
    }

    class ForumPost {
        +int id
        +int category_id
        +int author_id
        +string title
        +text content
        +int views
        +datetime created_at
        +create()
        +update()
        +delete()
        +addReply()
    }

    class ForumReply {
        +int id
        +int post_id
        +int author_id
        +text content
        +boolean is_solution
        +datetime created_at
        +create()
        +update()
        +delete()
    }

    class LostFoundPost {
        +int id
        +string type
        +string pet_name
        +string rfid_number
        +string status
        +text description
        +int posted_by
        +datetime created_at
        +create()
        +update()
        +matchRFID()
    }

    class FAQ {
        +int id
        +string question
        +text answer
        +string category
        +json keywords
        +int query_count
        +create()
        +update()
        +delete()
        +matchQuery()
    }

    class Notification {
        +int id
        +int user_id
        +string type
        +string title
        +text message
        +boolean is_read
        +datetime created_at
        +send()
        +markAsRead()
        +delete()
    }

    class HealthRecord {
        +int id
        +int pet_id
        +string record_type
        +string title
        +text description
        +date date_performed
        +string vet_name
        +decimal cost
        +create()
        +update()
        +delete()
    }

    class AuthController {
        +register()
        +login()
        +logout()
        +refreshToken()
        +getMe()
    }

    class PetController {
        +getAllPets()
        +getPetById()
        +createPet()
        +updatePet()
        +deletePet()
        +uploadImage()
    }

    class EventController {
        +getAllEvents()
        +getEventById()
        +createEvent()
        +updateEvent()
        +deleteEvent()
        +registerForEvent()
    }

    class ForumController {
        +getAllPosts()
        +getPostById()
        +createPost()
        +updatePost()
        +deletePost()
        +addReply()
    }

    %% Relationships
    User "1" --> "*" Pet : owns
    User "1" --> "*" AdoptionApplication : submits
    User "1" --> "*" Event : organizes
    User "1" --> "*" ForumPost : creates
    User "1" --> "*" ForumReply : creates
    User "1" --> "*" LostFoundPost : posts
    User "1" --> "*" Notification : receives
    User "1" --> "*" HealthRecord : creates

    Pet "1" --> "*" PetImage : has
    Pet "1" --> "*" AdoptionApplication : requested_for
    Pet "1" --> "*" HealthRecord : has
    Pet "n" --> "1" PetBreed : belongs_to

    Event "1" --> "*" User : registered_by

    ForumPost "1" --> "*" ForumReply : has
    ForumPost "n" --> "1" User : authored_by

    LostFoundPost "1" --> "1" User : posted_by

    AuthController ..> User : manages
    PetController ..> Pet : manages
    EventController ..> Event : manages
    ForumController ..> ForumPost : manages
```

---

#### 4.2.6 Sequence Diagrams

##### Sequence Diagram 1: User Registration and Login

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as AuthController
    participant DB as Database
    participant JWT as JWT Service

    Note over U,JWT: User Registration Flow
    U->>F: Fill Registration Form
    F->>A: POST /api/auth/register<br/>{name, email, password}
    A->>DB: Check if email exists
    DB-->>A: User not found
    A->>A: Hash password (bcrypt)
    A->>DB: INSERT INTO users
    DB-->>A: User created (id, name, email, role)
    A->>JWT: Generate token
    JWT-->>A: Access token + Refresh token
    A-->>F: {success: true, user, token, refreshToken}
    F->>F: Store token in localStorage
    F-->>U: Registration successful

    Note over U,JWT: User Login Flow
    U->>F: Enter credentials
    F->>A: POST /api/auth/login<br/>{email, password}
    A->>DB: SELECT user WHERE email
    DB-->>A: User data
    A->>A: Verify password (bcrypt.compare)
    A->>DB: UPDATE last_login
    A->>JWT: Generate token
    JWT-->>A: Access token + Refresh token
    A-->>F: {success: true, user, token, refreshToken}
    F->>F: Store token in localStorage
    F-->>U: Login successful, redirect to dashboard
```

##### Sequence Diagram 2: Pet Adoption Process

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant PC as PetController
    participant AC as AdoptionController
    participant DB as Database
    participant N as NotificationService
    participant SA as Shelter Admin

    Note over U,SA: Browse and View Pets
    U->>F: Browse pet listings
    F->>PC: GET /api/pets?status=Available
    PC->>DB: SELECT pets WHERE status='Available'
    DB-->>PC: List of pets
    PC-->>F: {success: true, pets: [...]}
    F-->>U: Display pet cards

    U->>F: Click on pet
    F->>PC: GET /api/pets/:id
    PC->>DB: SELECT pet WHERE id=:id
    PC->>DB: SELECT images WHERE pet_id=:id
    DB-->>PC: Pet details + images
    PC-->>F: {success: true, pet: {...}}
    F-->>U: Display pet details

    Note over U,SA: Submit Adoption Request
    U->>F: Click "Adopt Now"
    F->>F: Show adoption form
    U->>F: Fill adoption form
    F->>AC: POST /api/adoption-requests<br/>{pet_id, applicant_id, application_data}
    AC->>DB: INSERT INTO adoption_applications
    DB-->>AC: Application created
    AC->>N: Send notification to shelter
    N->>DB: INSERT INTO notifications
    N->>SA: Real-time notification
    AC-->>F: {success: true, message: "Request submitted"}
    F-->>U: Show success message

    Note over U,SA: Review and Approve Adoption
    SA->>F: View adoption requests
    F->>AC: GET /api/adoption-requests
    AC->>DB: SELECT adoption_applications
    DB-->>AC: List of requests
    AC-->>F: {success: true, requests: [...]}
    F-->>SA: Display requests

    SA->>F: Approve request
    F->>AC: PUT /api/adoption-requests/:id<br/>{status: 'Approved'}
    AC->>DB: UPDATE adoption_applications SET status='Approved'
    AC->>DB: UPDATE pets SET status='Adopted', owner_id=applicant_id
    AC->>N: Send notification to user
    N->>DB: INSERT INTO notifications
    N->>U: Real-time notification
    DB-->>AC: Updated
    AC-->>F: {success: true, message: "Request approved"}
    F-->>SA: Show updated status
    F-->>U: Show adoption approved notification
```

##### Sequence Diagram 3: Event Management and Real-time Chat

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant EC as EventController
    participant DC as DiscussionController
    participant DB as Database
    participant WS as WebSocket Server
    participant O as Other Users

    Note over U,O: Create and Register for Event
    U->>F: Create event
    F->>EC: POST /api/events<br/>{title, description, start_date, max_attendees}
    EC->>DB: INSERT INTO events
    DB-->>EC: Event created
    EC-->>F: {success: true, event: {...}}
    F-->>U: Event created successfully

    U->>F: Browse events
    F->>EC: GET /api/events
    EC->>DB: SELECT events WHERE is_active=true
    DB-->>EC: List of events
    EC-->>F: {success: true, events: [...]}
    F-->>U: Display events

    U->>F: Register for event
    F->>EC: POST /api/events/:id/register
    EC->>DB: Check participant limit
    EC->>DB: INSERT INTO event_registrations
    DB-->>EC: Registration successful
    EC-->>F: {success: true, message: "Registered"}
    F-->>U: Registration confirmed

    Note over U,O: Real-time Event Discussion
    U->>F: Join event discussion
    F->>WS: Socket.emit('join-event-room', eventId)
    WS->>WS: Add user to event room
    WS-->>F: Joined room confirmation
    F-->>U: Connected to chat

    U->>F: Type message
    F->>WS: Socket.emit('send-message', {eventId, message})
    WS->>DC: Handle message
    DC->>DB: INSERT INTO event_discussions
    DB-->>DC: Message saved
    DC->>WS: Broadcast message to room
    WS->>F: Socket.emit('new-message', message)
    WS->>O: Socket.emit('new-message', message)
    F-->>U: Display message
    F-->>O: Display message

    U->>F: Leave event discussion
    F->>WS: Socket.emit('leave-event-room', eventId)
    WS->>WS: Remove user from room
    WS-->>F: Left room confirmation
```

##### Sequence Diagram 4: Lost & Found with RFID Matching

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant LFC as LostFoundController
    participant RM as RFIDMatcher
    participant DB as Database
    participant N as NotificationService
    participant PO as Pet Owner

    Note over U,PO: Report Found Pet
    U->>F: Report found pet
    F->>F: Show report form
    U->>F: Enter pet details + RFID number
    F->>LFC: POST /api/lost-found<br/>{type: 'Found', rfid_number, ...}
    LFC->>RM: Check RFID match
    RM->>DB: SELECT lost_found_posts WHERE rfid_number=:rfid AND type='Lost'
    DB-->>RM: Matching lost pet found
    RM-->>LFC: Match found (lost_post_id, owner_id)
    
    alt RFID Match Found
        LFC->>DB: INSERT INTO lost_found_posts (Found)
        LFC->>DB: UPDATE lost_found_posts SET status='Resolved' WHERE id=lost_post_id
        LFC->>N: Send notification to pet owner
        N->>DB: INSERT INTO notifications
        N->>PO: Real-time notification
        LFC-->>F: {success: true, match: true, message: "Pet owner notified"}
        F-->>U: Show match found message
    else No RFID Match
        LFC->>DB: INSERT INTO lost_found_posts (Found)
        DB-->>LFC: Post created
        LFC-->>F: {success: true, match: false, message: "Post created"}
        F-->>U: Show post created message
    end

    Note over U,PO: Report Lost Pet
    PO->>F: Report lost pet
    F->>LFC: POST /api/lost-found<br/>{type: 'Lost', rfid_number, ...}
    LFC->>DB: INSERT INTO lost_found_posts (Lost)
    DB-->>LFC: Post created
    LFC-->>F: {success: true, message: "Lost pet reported"}
    F-->>PO: Post created successfully

    Note over U,PO: Manual RFID Search
    U->>F: Search by RFID
    F->>LFC: GET /api/lost-found/search/rfid?rfid=:rfid
    LFC->>RM: Search RFID
    RM->>DB: SELECT WHERE rfid_number=:rfid
    DB-->>RM: Matching posts
    RM-->>LFC: Search results
    LFC-->>F: {success: true, matches: [...]}
    F-->>U: Display matching posts
```

##### Sequence Diagram 5: FAQ Chatbot Query

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant FC as FAQController
    participant FM as FAQMatcher
    participant DB as Database
    participant A as Admin

    Note over U,A: Query FAQ Chatbot
    U->>F: Type question in chatbot
    F->>FC: POST /api/faq/query<br/>{query: "How to adopt a pet?"}
    FC->>FM: Process query
    FM->>FM: Extract keywords from query
    FM->>DB: SELECT FAQs
    DB-->>FM: All FAQs with keywords
    FM->>FM: Calculate cosine similarity
    FM->>FM: Find best matching FAQ
    FM-->>FC: Best match (FAQ id, similarity score)
    
    alt High Similarity Match
        FC->>DB: UPDATE FAQs SET query_count=query_count+1
        FC->>DB: INSERT INTO faq_query_logs
        FC-->>F: {success: true, answer: FAQ answer, faq_id}
        F-->>U: Display FAQ answer
        U->>F: Provide feedback (helpful/not helpful)
        F->>FC: POST /api/faq/feedback<br/>{faq_id, feedback}
        FC->>DB: UPDATE FAQ statistics
    else Low Similarity Match
        FC->>DB: INSERT INTO faq_query_logs (no_match)
        FC-->>F: {success: true, answer: "Default response", no_match: true}
        F-->>U: Display default response
        FC->>A: Escalate to admin (optional)
    end
```

---

## Diagram Usage Instructions

### How to Use These Diagrams in Your Report

1. **Mermaid Live Editor**:
   - Copy the Mermaid code from any diagram
   - Visit https://mermaid.live/
   - Paste the code
   - Export as PNG or SVG

2. **VS Code**:
   - Install "Markdown Preview Mermaid Support" extension
   - Open this markdown file
   - Preview the diagrams
   - Export as needed

3. **GitHub/GitLab**:
   - Mermaid diagrams render automatically in markdown files
   - Simply commit the markdown file

4. **Alternative Tools**:
   - Draw.io (diagrams.net) - Import/export Mermaid
   - PlantUML - Convert Mermaid to PlantUML if needed
   - Lucidchart - Manual recreation for professional presentations

### Diagram Descriptions for Report

**4.1 System Architecture**:
- Shows the overall system structure with three-tier architecture
- Demonstrates separation of concerns (Presentation, Application, Data layers)
- Illustrates integration with external services

**4.2.1 Data Flow Diagram (DFD)**:
- Level 0: Context diagram showing system boundaries
- Level 1: Major processes and data stores
- Level 2: Detailed process decomposition (Pet Adoption example)

**4.2.2 Use Case Diagram**:
- Shows all actors (user roles) and their interactions
- Demonstrates system functionality from user perspective
- Organized by feature modules

**4.2.3 Class Diagram**:
- Shows system entities and their relationships
- Demonstrates object-oriented design
- Includes attributes and methods

**4.2.4 Sequence Diagrams**:
- User Registration and Login
- Pet Adoption Process
- Event Management with Real-time Chat
- Lost & Found with RFID Matching
- FAQ Chatbot Query

---

## Notes

- All diagrams are in Mermaid format for easy rendering and editing
- Diagrams can be customized with colors and styles as needed
- Sequence diagrams show detailed interaction flows
- Class diagram represents the data model and business logic
- Use case diagram covers all major system features
- Data flow diagrams show data movement through the system

