import React, { createContext, useContext, useState } from "react";

export interface TokenOperationsBalances {
  srcBalance: number;
  destBalance: number;
}

interface IState {
  totalBalances: TokenOperationsBalances;
  setTotalBalances: (val: TokenOperationsBalances) => void;
  srcLoading: boolean;
  setSrcLoading: (val: boolean) => void;
  destLoading: boolean;
  setDestLoading: (val: boolean) => void;
  srcUsdPrice: number;
  setSrcUsdPrice: (val: number) => void;
  destUsdPrice: number;
  setDestUsdPrice: (val: number) => void;
  destTokenAmount: number;
  setdestTokenAmount: (val: number) => void;
  srcTokenAmount: number;
  setsrcTokenAmount: (val: number) => void;
  srcAvailableAmountLoading: boolean;
  setSrcAvailableAmountLoading: (val: boolean) => void;
  destAvailableAmountLoading: boolean;
  setDestAvailableAmountLoading: (val: boolean) => void;
  clearAmounts: () => void;
  createAmountsCopyForSnackbar: () => void;
  destTokenAmountCopy: number;
  srcTokenAmountCopy: number;
  clearAmountsCopyForSnackbar: () => void;
}

const Context = createContext<IState>({} as IState);

interface IProps {
  children: React.ReactNode;
}

const TokenOperationsStore = ({ children }: IProps) => {
  const [totalBalances, setTotalBalances] = useState<TokenOperationsBalances>({
    srcBalance: 0,
    destBalance: 0,
  });
  const [destTokenAmount, setdestTokenAmount] = useState(0);
  const [srcTokenAmount, setsrcTokenAmount] = useState(0);
  const [srcLoading, setSrcLoading] = useState(false);
  const [destLoading, setDestLoading] = useState(false);
  const [srcUsdPrice, setSrcUsdPrice] = useState(0);
  const [destUsdPrice, setDestUsdPrice] = useState(0);
  const [srcAvailableAmountLoading, setSrcAvailableAmountLoading] =
    useState(true);
  const [destAvailableAmountLoading, setDestAvailableAmountLoading] =
    useState(true);
  const [destTokenAmountCopy, setDestTokenAmountCopy] = useState(0);
  const [srcTokenAmountCopy, setSrcTokenAmountCopy] = useState(0);

  const clearAmounts = () => {
    setDestUsdPrice(0);
    setSrcUsdPrice(0);
    setdestTokenAmount(0);
    setsrcTokenAmount(0);
  };

  const createAmountsCopyForSnackbar = () => {
    setDestTokenAmountCopy(destTokenAmount);
    setSrcTokenAmountCopy(srcTokenAmount);
  };

  const clearAmountsCopyForSnackbar = () => {
    setDestTokenAmountCopy(0);
    setSrcTokenAmountCopy(0);
  };

  const value = {
    totalBalances,
    setTotalBalances,
    srcLoading,
    setSrcLoading,
    destLoading,
    setDestLoading,
    srcUsdPrice,
    setSrcUsdPrice,
    destUsdPrice,
    setDestUsdPrice,
    destTokenAmount,
    setdestTokenAmount,
    srcTokenAmount,
    setsrcTokenAmount,
    srcAvailableAmountLoading,
    setSrcAvailableAmountLoading,
    destAvailableAmountLoading,
    setDestAvailableAmountLoading,
    clearAmounts,
    createAmountsCopyForSnackbar,
    destTokenAmountCopy,
    srcTokenAmountCopy,
    clearAmountsCopyForSnackbar
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
const useTokenOperationsStore = () => useContext(Context);
export { TokenOperationsStore, useTokenOperationsStore };