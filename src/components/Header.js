import React from 'react';

import { Box, Text, Image, SimpleGrid, Center, Flex } from '@chakra-ui/react';

import logo from '../assets/logo.svg';

export const Header = ({
  scrollToRegister = () => {},
  scrollToUsers = () => {},
}) => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding={4}
      minWidth="100%"
      className="nav_bar"
    >
      <Box display={'flex'} alignItems={'center'} flexDirection={'row'}>
        <Image src={logo} alt="abzlogo" width={'38.11px'} height={'26px'} />

        <Text
          alignItems={'center'}
          fontSize="16px"
          fontWeight="400"
          lineHeight="26px"
          color="black"
        >
          TESTTASK
        </Text>
      </Box>
      <SimpleGrid columns={{ sm: 2, md: 2 }} spacing={{ sm: 4, md: 12 }}>
        <Center
          borderRadius={'80px'}
          backgroundColor={'#F4E041'}
          height={'34px'}
          width={'100px'}
          padding={2}
          onClick={() => scrollToUsers()}
        >
          <Text
            fontSize="16px"
            fontWeight="400"
            lineHeight="26px"
            color="black"
          >
            Users
          </Text>
        </Center>

        <Center
          borderRadius={'80px'}
          backgroundColor={'#F4E041'}
          height={'34px'}
          width={'100px'}
          padding={2}
          onClick={() => scrollToRegister()}
        >
          <Text
            fontSize="16px"
            fontWeight="400"
            lineHeight="26px"
            color="black"
          >
            Sign Up
          </Text>
        </Center>
      </SimpleGrid>
    </Flex>
  );
};
