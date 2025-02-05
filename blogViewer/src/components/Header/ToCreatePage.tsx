import { Button } from "../ui/button";

export default function ToCreatePage() {
  const navigateToCreatePage = () => {
    window.location.href = `${import.meta.env.VITE_OTHER_HOST_URL}`;
  };

  return (
    <Button size={"lg"} onClick={navigateToCreatePage} variant="default">
      Creator Space
    </Button>
  );
}
