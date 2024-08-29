import React from "react";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";

export default function Revenue() {
  return (
    <Card>
      <div>
        <Heading size="md">Revenue Report</Heading>
      </div>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Summary
            </Heading>
            <div>View a summary of all your clients over the last month.</div>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Overview
            </Heading>
            <div>Check out the overview of your clients.</div>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Analysis
            </Heading>
            <div>See a detailed analysis of all your business clients.</div>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
