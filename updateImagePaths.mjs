import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import fs from "fs";

// PLEASE CONTACT A TECH MANAGER FOR THE SERVICE ACCOUNT KEY

// Initialize Firebase Admin SDK with service account credentials
initializeApp({
    credential: cert("./serviceAccountKey.json"), // Path to your service account JSON
    storageBucket: "eon-english-app.appspot.com"   // Your Firebase Storage bucket name
});

const db = getFirestore();  // Firestore reference
const bucket = getStorage().bucket();  // Firebase Storage reference

// Function to process lessons and add new image URL field
async function addImageURLs() {
    // List all collections in Firestore (top-level collections)
    const snapshot = await db.listCollections();

    for (const collectionRef of snapshot) {
        // Only process lesson collections (e.g. "Lesson 1")
        if (collectionRef.id.startsWith("Lesson")) {
            console.log(`Processing collection: ${collectionRef.id}`);

            // Get all documents in the "Image Match/Collection" subcollection
            const imageMatchCollectionRef = collectionRef.doc("Image Match").collection("Collection");
            const imageMatchDocs = await imageMatchCollectionRef.get();

            for (const doc of imageMatchDocs.docs) {
                const data = doc.data();

                // Make sure the document has an 'image' field with the path
                const imagePath = data.image;
                if (imagePath) {
                    try {
                        // Generate the public URL for the image
                        const encodedPath = encodeURIComponent(imagePath);
                        const publicUrl = `https://storage.googleapis.com/${bucket.name}${encodedPath}`;

                        // Add a new field with the public URL without overwriting other fields
                        await doc.ref.update({
                            devImageURL: publicUrl  // Adds 'newImageUrl' field with public URL
                        });

                        console.log(`✅ Added 'newImageUrl' field to ${doc.id}`);
                    } catch (err) {
                        console.error(`❌ Error processing ${doc.id}:`, err.message);
                    }
                }
            }
        }
    }
}

// Run the script
addImageURLs().then(() => {
    console.log("Image URLs added successfully.");
}).catch(err => {
    console.error("Error adding image URLs:", err);
});
