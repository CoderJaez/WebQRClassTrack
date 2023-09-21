import {
  Image,
  Title,
  Button,
  Text,
  Container,
  SimpleGrid,
} from "@mantine/core";
import React from "react";
import classes from "@assets/css/NotFound.module.css";
import imgNotFound from "@assets/notfound.svg";
import { useNavigate } from "react-router-dom";
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={imgNotFound} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={() => navigate("/login")}
          >
            Get back to home page
          </Button>
        </div>
        <Image src={imgNotFound} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
};

export default NotFoundPage;
