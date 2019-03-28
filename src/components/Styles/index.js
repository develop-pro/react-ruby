import styled from 'styled-components';
import {FormControl} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ButtonStyle = styled.button`
  background-color: #fff !important;
  color: #0071bc !important;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 20px 13px;
  margin-right: 4px;
  &:hover {
    color: #fff !important;
    background-color: #39b54a !important;
    border-color: #39b54a;-webkit-transition: all .2s ease-in-out;-o-transition: all .2s ease-in-out;transition: all .2s ease-in-out;
  }
`

const Bold = styled.b`
  font-weight: 500
`

const WhiteLinkButton = styled(Link)`
  background-color: #fff !important;
  color: #0071bc !important;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 20px 13px;
  margin-right: 4px;
  display: inline-block;
  border: 1px solid #337ab7;
  border-radius: 4px;
  &:hover {
    color: #fff !important;
    background-color: #39b54a !important;
    border-color: #39b54a;-webkit-transition: all .2s ease-in-out;-o-transition: all .2s ease-in-out;transition: all .2s ease-in-out;
  }
`

const Title = styled.h2`
  width: 100%;
  float: left;
  margin: 15px 0 20px;
  font-weight: 700;
  color: #39b54a;
  font-family: 'Raleway';
  font-size: 24px;
  border-bottom: 1px solid #8da3aa;
  padding-bottom: 15px;
`

const Label = styled.div`
  float: left;
  font-size: 20px;
  color: #636464;
  font-family: Calibri;
  padding-top: 9px;
  font-weight: normal;
  text-transform: capitalize;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`

const FieldContainer = styled.div`
  width: 100%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
  float: right;
  margin-bottom: 20px;
  div:2nd-child {
    margin-bottom: 0px;
  }
`

const StyledFormControl = styled(FormControl)`
  display: block;
  width: 100%;
  float: left;
  height: 52px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-size: 14px;
  color: #5b697b;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  padding: 15px;
  margin-bottom: 0;
`

const VTab = styled.li`
  position: relative;
  top: 1px;
  padding: 15px 0;
  color: #39b54a;
  margin: 0px;
  font-size: 16px;
  font-weight: 700;
  list-style: none;
  border-bottom: solid 1px #CCC;
  -moz-user-select: none;
  -khtml-user-select: none;
  cursor: pointer;
  a, a:hover, a:visited {
    color: #39b54a;
    text-decoration: none;
  }
  a:hover {

  }
`

const ContentGroup = styled.div`
  clear: none;
  float: left;
  padding: 0px;
  width:86%;
  min-height:350px;
  border-left: 1px solid #ccc;


  @media screen and (max-width: 1200px) {
    width: 84%;
  }
  @media screen and (max-width: 991px) {
    width: 79%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    border-left: 0;
  }
`

const VTabs = styled.ul`
  float: left;
  width:150px;
  position: relative;
  padding: 0;
  margin: 0;
  li:hover, .active {
    border-right: 4px solid #39b54a;
  }
  @media screen and (max-width: 767px) {
    width: 100%
  }
`

export { Label, ButtonStyle, Title, StyledFormControl, FieldContainer,
         WhiteLinkButton, Bold, VTab, VTabs, ContentGroup }
