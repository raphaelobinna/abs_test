import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Image,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Center,
  SimpleGrid,
  Radio,
  extendTheme,
} from '@chakra-ui/react';

import '@fontsource/nunito';

// import BgImage from './background.png';
import { Header } from './components/Header';
import { ProfileCard } from './components/ProfileCard';

import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from './redux/slices/users';
import { getToken, register } from './redux/slices/auth';
import { getPositions } from './redux/slices/positions';

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  base: '0px',
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme({
  fonts: {
    body: `'Nunito', nunito`,
  },
  breakpoints,
});

function App() {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const authState = useSelector(state => state.auth);
  const positionState = useSelector(state => state.position);

  const [input, setInput] = React.useState({
    name: '',
    email: '',
    phone: '',
  });

  const signupRef = React.useRef(null);
  const usersRef = React.useRef(null);

  const scrollToSignup = () => {
    signupRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToUsers = () => {
    usersRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [page, setPage] = React.useState(1);

  const [imageUrl, setImageUrl] = React.useState(null);

  React.useEffect(() => {
    dispatch(getToken());

    dispatch(getPositions());
  }, []);

  React.useEffect(() => {
    dispatch(
      getAllUsers({
        page,
        count: 6,
      })
    );
  }, [authState?.reload, page]);

  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const phoneNumberRegex = /^[\+]{0,1}380([0-9]{9})$/;

    const emailRegex =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    let formErrors = {};

    if (input.name.length < 2 || input.name.length > 60) {
      formErrors.name =
        'name is required and length greater than 2 and less than 60';
    }

    if (!input.phone.trim()) {
      formErrors.phone = 'phone is required';
    } else if (!phoneNumberRegex.test(input.email)) {
      formErrors.phone = ' Number should start with code of Ukraine +380';
    }

    if (!input.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!emailRegex.test(input.email)) {
      formErrors.email = 'Invalid email address';
    } else if (input.email.length > 100) {
      formErrors.email = 'email address should be less than 100 characters';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const validateImage = file => {
    return new Promise((resolve, reject) => {
      // Check if file is a jpeg/jpg image
      const acceptedFormats = ['image/jpeg', 'image/jpg'];
      if (!acceptedFormats.includes(file.type)) {
        reject('Image format must be jpeg/jpg.');
        return;
      }

      // Check if file size is not greater than 5 MB
      const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
      if (file.size > maxSize) {
        reject('Image size must not be greater than 5 MB.');
        return;
      }

      // Create an image object to get image dimensions
      const image = new window.Image();
      image.src = URL.createObjectURL(file);

      image.onload = () => {
        // Check if image dimensions are at least 70x70px
        if (image.width < 70 || image.height < 70) {
          reject('Minimum size of photo must be 70x70px.');
        } else {
          resolve();
        }
      };

      image.onerror = () => {
        reject('Failed to load image.');
      };
    });
  };

  const handleLoadMore = () => {
    if (userState?.users.page < userState?.users.total_pages) {
      setPage(prevPage => prevPage + 1); // Increment page number
    }
  };

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];

    validateImage(selectedFile)
      .then(() => {
        setInput({ ...input, photo: selectedFile });
        const url = URL.createObjectURL(selectedFile);
        setImageUrl(url);
        setErrors({ ...errors, photo: '' });
      })
      .catch(error => {
        setErrors({ ...errors, photo: error });
        // Display error message to the user
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(
        register({
          ...input,
        })
      );
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    setInput({
      ...input,
      [name]: value,
    });
  };
  return (
    <ChakraProvider theme={theme}>
      <Center
        backgroundColor={'rgba(248, 248, 248, 1)'}
        flexDirection={'column'}
      >
        <Header
          scrollToRegister={scrollToSignup}
          scrollToUsers={scrollToUsers}
        />

        <Center
          bgImage={'/background.png'}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          height={'768px'}
          minWidth={'100%'}
          flexDirection={'column'}
          paddingLeft={{ md: 24 }}
          paddingRight={{ md: 24 }}
        >
          <Text
            fontFamily="Nunito"
            fontSize="40px"
            fontWeight="400"
            lineHeight="40px"
            letterSpacing="0em"
            color="white"
            textAlign="center"
            width={{ sm: '328px', md: '380px' }}
          >
            Test assignment for front-end developer
          </Text>
          <br />
          <Text
            fontSize="16px"
            fontWeight="400"
            lineHeight="26px"
            color="white"
            textAlign="center"
            width={{ sm: '328px', md: '380px' }}
          >
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </Text>
          <br />
          <Center
            borderRadius={'80px'}
            width={'100px'}
            height={'34px'}
            backgroundColor={'#F4E041'}
            padding={2}
            onClick={scrollToSignup}
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
        </Center>

        <Text
          fontSize="40px"
          fontWeight="400"
          lineHeight="40px"
          color="black"
          marginTop={20}
          marginBottom={12}
          textAlign={'center'}
        >
          Working with GET request
        </Text>

        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          spacing={{ sm: 10, md: 10 }}
          ref={usersRef}
        >
          {userState?.users &&
            userState?.users.hasOwnProperty('users') &&
            userState.users?.users.map((user, i) => (
              <ProfileCard key={i} {...user} />
            ))}
        </SimpleGrid>

        {userState?.users &&
          userState?.users.hasOwnProperty('users') &&
          userState?.users.page !== userState?.users.total_pages && (
            <Center
              alignSelf={'center'}
              borderRadius={'80px'}
              width={'100px'}
              height={'34px'}
              backgroundColor={'#F4E041'}
              padding={2}
              marginTop={12}
              onClick={handleLoadMore}
            >
              <Text
                fontSize="16px"
                fontWeight="400"
                lineHeight="26px"
                color="black"
              >
                Show more
              </Text>
            </Center>
          )}

        <Box>
          <Text
            fontSize="40px"
            fontWeight="400"
            lineHeight="40px"
            color="black"
            marginTop={20}
            marginBottom={12}
            textAlign={'center'}
          >
            Working with POST request
          </Text>

          <Center ref={signupRef}>
            <form onSubmit={handleSubmit}>
              <FormControl marginBottom={10} id="name" isInvalid={errors.name}>
                <Input
                  type="text"
                  name="name"
                  borderColor={'rgba(208, 207, 207, 1)'}
                  height={'54px'}
                  width={{ sm: '328px', md: '380px' }}
                  value={input.name}
                  placeholder="Your name"
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl
                marginBottom={10}
                id="email"
                isInvalid={errors.email}
              >
                <Input
                  type="email"
                  name="email"
                  borderColor={'rgba(208, 207, 207, 1)'}
                  height={'54px'}
                  width={{ sm: '328px', md: '380px' }}
                  placeholder="email"
                  value={input.email}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                marginBottom={10}
                id="phone"
                isInvalid={errors.phone}
              >
                <Input
                  type="text"
                  name="phone"
                  borderColor={'rgba(208, 207, 207, 1)'}
                  height={'54px'}
                  width={{ sm: '328px', md: '380px' }}
                  placeholder="phone"
                  value={input.phone}
                  onChange={handleChange}
                />
                <FormLabel
                  fontSize="12px"
                  fontWeight="400"
                  lineHeight="14px"
                  color="rgba(126, 126, 126, 1)"
                  marginTop={'4px'}
                >
                  +38 (XXX) XXX - XX - XX
                </FormLabel>
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>

              <Text
                fontSize="16px"
                fontWeight="400"
                lineHeight="26px"
                color={'rgba(0, 0, 0, 0.87)'}
                marginTop={10}
                marginBottom={4}
              >
                Select your position
              </Text>

              <Stack marginBottom={10}>
                {positionState.positions &&
                  positionState.positions.length > 0 &&
                  positionState.positions.map((position, i) => (
                    <Radio
                      key={i}
                      size="md"
                      name={'position_id'}
                      value={position.id}
                      isChecked={input?.position_id == position.id}
                      onChange={handleChange}
                    >
                      <Text fontSize="16px" fontWeight="400" lineHeight="26px">
                        {position?.name}
                      </Text>
                    </Radio>
                  ))}
              </Stack>

              {imageUrl && (
                <Image
                  src={imageUrl}
                  height={'70px'}
                  width={'70px'}
                  borderRadius={'100%'}
                  marginBottom={10}
                />
              )}

              <Box
                border="1px solid"
                borderColor={'rgba(208, 207, 207, 1)'}
                height={'54px'}
                display={'flex'}
                flexDirection={'row'}
                borderRadius="4px"
                alignItems={'center'}
                width={{ sm: '328px', md: '380px' }}
              >
                <Center
                  height={'54px'}
                  border="1px solid"
                  borderTopLeftRadius={'4px'}
                  borderBottomLeftRadius={'4px'}
                  width={{ sm: '83px', md: '83px' }}
                >
                  <label
                    htmlFor="contained-button-file"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <Text fontSize="16px" fontWeight="400" lineHeight="26px">
                      Upload
                    </Text>
                  </label>
                </Center>

                <input
                  accept="image/*"
                  style={{
                    display: 'none',
                    width: '100%',
                    height: '100%',
                  }}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleFileChange}
                />

                <Text
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="26px"
                  color="rgba(126, 126, 126, 1)"
                  marginLeft={{ sm: '4px', md: 4 }}
                >
                  Upload your photo
                </Text>
              </Box>
              {errors?.photo && (
                <Text
                  fontSize="12px"
                  fontWeight="400"
                  lineHeight="14px"
                  color="red.500"
                  marginTop={'4px'}
                >
                  {errors.photo}
                </Text>
              )}

              <Center marginY={10}>
                <Button
                  mt={4}
                  alignSelf={'center'}
                  borderRadius={'80px'}
                  width={'100px'}
                  height={'34px'}
                  backgroundColor={
                    !input?.position_id || !input.photo ? 'gray' : '#F4E041'
                  }
                  isLoading={userState?.isLoading}
                  padding={2}
                  isDisabled={!input?.position_id || !input.photo}
                  type="submit"
                >
                  <Text
                    fontSize="16px"
                    fontWeight="400"
                    lineHeight="26px"
                    color={
                      !input?.position_id || !input.photo ? 'white' : 'black'
                    }
                  >
                    Sign up
                  </Text>
                </Button>
              </Center>
            </form>
          </Center>
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
