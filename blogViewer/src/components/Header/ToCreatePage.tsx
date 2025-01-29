import { Button } from "../ui/button";

export default function ToCreatePage() {
    const navigateToCreatePage = () => {
      window.location.href = "/create";
    };
  
    return (
      <Button size={'lg'} onClick={navigateToCreatePage} variant="default">
        Creator Space
      </Button>
    );
  }