import { useNavigate } from 'react-router-dom';
import { Box, Flex, Avatar, HStack, Link, Button, Menu, MenuButton, MenuList, MenuItem, useDisclosure, IconButton, Image, VStack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from '../assets/FluidTradesLogoBG.PNG';

const Links = [
    { name: 'Dashboard', to:'homepage'},
    { name: 'Ryan', to:'ryan'},
    { name: 'is', to:'ryan'},
    { name: 'gay', to:'ryan'}
];

const Navbar = () => {
    const navigate = useNavigate();

    return (
    <>
        <Box bg={'#F5EFDF'} px={4} w='100%'>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Menu>
                {({ isOpen }) => (
                    <>
                    <MenuButton isActive={isOpen} as={Button}>
                        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    </MenuButton>

                    <MenuList>
                        {Links.map(({name, to}) => (
                            <MenuItem onClick={ () => navigate(`${to}`)}> {name} </MenuItem>
                        ))}
                    </MenuList>
                    </>
                )}
                </Menu>
                <Avatar alt="Fluid Trades Logo" src={Logo} />
            </Flex> 
        </Box>
    </>
    )
}

export default Navbar;