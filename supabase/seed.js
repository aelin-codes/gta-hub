// Supabase Seeding Script for GTA 6 Hub categories and superuser bootstrap
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Error: Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your env.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const taxonomy = [
  {
    parent: "Easter Eggs & Secrets",
    children: ["Hidden Locations", "Unmarked Buildings", "Cryptic Clues/ARG Tie-ins", "References to Past GTA Games"]
  },
  {
    parent: "Missions & Story",
    children: ["Main Story Walkthroughs", "Side Missions", "Mission Tips & Strategies", "Story Theories & Lore"]
  },
  {
    parent: "Map & Exploration",
    children: ["Region Guides", "Points of Interest", "Hidden Areas", "Map Comparisons (vs. real-world/past games)"]
  },
  {
    parent: "Characters",
    children: ["Character Profiles", "Voice Cast & Performance", "Relationships/Story Arcs"]
  },
  {
    parent: "Vehicles",
    children: ["Car Spotlights", "Customization Guides", "Vehicle Locations", "Planes/Boats/Bikes"]
  },
  {
    parent: "Weapons & Combat",
    children: ["Weapon Showcases", "Combat Tips", "Loadout Guides"]
  },
  {
    parent: "Money & Economy",
    children: ["Money-Making Guides", "Property/Business Investments", "Economy Breakdown"]
  },
  {
    parent: "Online & Multiplayer",
    children: ["Heists", "Co-op Missions", "PvP/Competitive", "Online Customization", "Online Events"]
  },
  {
    parent: "Glitches & Bugs",
    children: ["Sequence Breaks", "Visual Glitches", "Patch Notes Impact"]
  },
  {
    parent: "Speedruns & Challenges",
    children: ["Speedrun Routes", "Self-Imposed Challenges", "100% Completion Guides"]
  },
  {
    parent: "Customization & Style",
    children: ["Character Customization", "Property Decoration", "Outfits/Fashion"]
  },
  {
    parent: "News & Trailers",
    children: ["Official Trailers", "Release Updates", "Rockstar Announcements"]
  },
  {
    parent: "Mods & PC",
    children: ["Mod Showcases", "Performance/Settings Guides"]
  },
  {
    parent: "Soundtrack & World",
    children: ["Radio Stations", "Soundtrack Breakdown", "Ambient World Details"]
  },
  {
    parent: "Theories & Comparisons",
    children: ["Fan Theories", "Comparisons to GTA 5/Vice City", "Dev Interview Breakdowns"]
  },
  {
    parent: "Funny & Highlight Moments",
    children: ["Streamer Reactions", "Funny Clips", "Best Moments Compilations"]
  }
];

async function seedCategories() {
  console.log("Seeding categories...");
  for (const item of taxonomy) {
    // Insert or fetch parent
    let { data: parentData, error: parentError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', item.parent)
      .single();

    if (!parentData) {
      const { data: newParent, error: createError } = await supabase
        .from('categories')
        .insert({ name: item.parent })
        .select('id')
        .single();
      if (createError) {
        console.error(`Failed to create parent category: ${item.parent}`, createError);
        continue;
      }
      parentData = newParent;
      console.log(`Created parent category: ${item.parent}`);
    } else {
      console.log(`Parent category already exists: ${item.parent}`);
    }

    // Insert children
    for (const childName of item.children) {
      let { data: childData } = await supabase
        .from('categories')
        .select('id')
        .eq('name', childName)
        .single();

      if (!childData) {
        const { error: childCreateError } = await supabase
          .from('categories')
          .insert({ name: childName, parent_id: parentData.id });
        if (childCreateError) {
          console.error(`Failed to create child category: ${childName}`, childCreateError);
        } else {
          console.log(`Created sub-category: ${childName} (under ${item.parent})`);
        }
      }
    }
  }
}

async function seedSuperuser() {
  const email = process.env.SUPERUSER_EMAIL;
  const password = process.env.SUPERUSER_PASSWORD;

  if (!email || !password) {
    console.log("Skipping superuser seeding (SUPERUSER_EMAIL or SUPERUSER_PASSWORD not set).");
    return;
  }

  console.log(`Attempting to seed superuser: ${email}...`);

  // Check if user already exists in auth.users
  // In Supabase, we can list users or try to sign up/create them.
  // Using the admin auth API:
  const { data: usersList, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error("Failed to list users", listError);
    return;
  }

  let user = usersList.users.find(u => u.email === email);

  if (!user) {
    console.log("Superuser auth account does not exist. Creating...");
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    });

    if (createError) {
      console.error("Failed to create superuser auth account:", createError);
      return;
    }
    user = newUser.user;
    console.log("Superuser auth account created successfully.");
  } else {
    console.log("Superuser auth account already exists.");
  }

  // Ensure user is in the public.users table with role = 'superuser'
  const { data: userRow, error: selectError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!userRow) {
    console.log("Inserting user row with superuser role...");
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: email,
        role: 'superuser',
        is_premium: true
      });
    if (insertError) {
      console.error("Failed to insert superuser row:", insertError);
    } else {
      console.log("Superuser row inserted successfully.");
    }
  } else {
    console.log("Updating existing user row to superuser role...");
    const { error: updateError } = await supabase
      .from('users')
      .update({ role: 'superuser', is_premium: true })
      .eq('id', user.id);
    if (updateError) {
      console.error("Failed to update user row to superuser:", updateError);
    } else {
      console.log("Superuser row updated successfully.");
    }
  }
}

async function main() {
  try {
    await seedCategories();
    await seedSuperuser();
    console.log("Seeding process completed!");
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

main();
