import React from 'react';

import { Text, Image, Center } from '@chakra-ui/react';

export const ProfileCard = ({
  name = '',
  email = '',
  phone = '',
  position = '',
  photo,
}) => {
  return (
    <Center
      flexDirection={'column'}
      width={'344px'}
      height={'254px'}
      borderRadius={'10px'}
      backgroundColor={'white'}
    >
      <Image src={photo} height={'70px'} width={'70px'} borderRadius={'100%'} />

      <Text
        fontSize="16px"
        fontWeight="400"
        lineHeight="26px"
        color="rgba(0, 0, 0, 0.87)"
        marginY={4}
      >
        {name}
      </Text>

      <Text
        fontSize="16px"
        fontWeight="400"
        lineHeight="26px"
        color="rgba(0, 0, 0, 0.87)"
      >
        {position}
      </Text>

      <Text
        fontSize="16px"
        fontWeight="400"
        lineHeight="26px"
        color="rgba(0, 0, 0, 0.87)"
      >
        {email}
      </Text>

      <Text
        fontSize="16px"
        fontWeight="400"
        lineHeight="26px"
        color="rgba(0, 0, 0, 0.87)"
      >
        {phone}
      </Text>
    </Center>
  );
};
