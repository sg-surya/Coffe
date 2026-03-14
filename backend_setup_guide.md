# CafeFlow Backend Setup Guide (MySQL & Java)

Ye chote, easy steps hain jinko aap sequentially follow kijiye apne system par taaki backend smoothly chalne lage. 

---

### Step 1: Editor aur Terminal ko Refresh karein
Jab naya Java install hota hai, system ke running terminals usko detect nahi karte.
1. Apna Windsurf (ya VS Code / jo bhi use kar rahe ho) **poori tarah close** kijiye.
2. Usse wapas open kijiye (us folder mein `d:\Coffe`).
3. Ek naya terminal open kijiye aur likhiye: 
   ```powershell
   java -version
   ```
   *Note: Agar version number (like "21.0") dikhta hai, toh badhai ho! Ab badhte hain aage.*

### Step 2: MySQL Database Create karein
Aapka MySQL local par chal raha hona chahiye.
1. Apne MySQL client (Jaise MySQL Workbench, phpMyAdmin, ya MySQL Command Line) ko open kijiye.
2. Ye naya database banane wala query run kijiye:
   ```sql
   CREATE DATABASE cafeflow;
   ```
3. *(Optional)* Agar aapka MySQL username `root` nahi hai, ya password `root` ke alawa kuch aur hai, toh is file me usey jarur update kar lijiye: 
   👉 [d:\Coffe\backend\src\main\resources\application.properties](file:///d:/Coffe/backend/src/main/resources/application.properties)

### Step 3: Backend ko Start Karein
Ab hum Spring Boot application run karke check karenge.
1. Terminal mein backend folder ke andar jayein:
   ```powershell
   cd d:\Coffe\backend
   ```
2. Ye command run karke Spring Boot chalu kariye:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
   *(Note: Pehli baar run hone par ye kaafi dependency automatically download karega internet se (Spring, Hibernate, etc) toh thoda time lagta hai).*

### Step 4: Verification 
1. Terminal par dhyan dein jab tak ye text naa dikhe: **`Started CafeManagementApplication in X.XXX seconds`**.
2. Ab apna MySQL Database (jaise MySQL Workbench me) refresh kariye.
3. Aap dekhenge ki `cafeflow` database me kuch nayi tables apne aap ban chuki hongi: `users`, `menu_items`, `orders`, `tables`, aadi.

---

**Next Steps jab aap ye complete kar lein:**
Hume bas ek chiz aur karni hai: Frontend se API (login/register/orders) call karana, aur Backend mein unke Controllers (Logic) likhna. 

Aap mujhe tab bata dena jab aap **Step 4** (run success wala step) tak pohoch jayen!
