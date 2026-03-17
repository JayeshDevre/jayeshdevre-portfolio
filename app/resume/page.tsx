import { redirect } from "next/navigation";

const RESUME_URL =
  "https://drive.google.com/file/d/1oHWgonzyarsVviKqSvbgiOkt7JOJhFXp/view?usp=drive_link";

export default function ResumeRedirectPage() {
  redirect(RESUME_URL);
}

