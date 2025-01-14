import { APP_NAME } from 'consts';
import { isMobile } from 'react-device-detect';
import { ConfigStore } from 'ton';
import { TonhubConnector } from 'ton-x';
import { TonhubCreatedSession } from 'ton-x/dist/connector/TonhubConnector';
import { base64UrlEncode } from 'utils';
import { TransactionRequest, Wallet, WalletAdapter } from '../types';

const TONHUB_TIMEOUT = 5 * 60 * 1000;

export class TonhubWalletAdapter
  implements WalletAdapter<TonhubCreatedSession>
{
  constructor(private readonly tonhubConnector: TonhubConnector) {}

  createSession(): Promise<TonhubCreatedSession> {
    const { location } = document;
    const url = `${location.protocol}//${location.host}`
    console.log(location, url  );
    

    return this.tonhubConnector.createNewSession({
      name: APP_NAME,
      url,
    });
  }

  async awaitReadiness(session: TonhubCreatedSession): Promise<Wallet> {
    const state = await this.tonhubConnector.awaitSessionReady(
      session.id,
      TONHUB_TIMEOUT
    );

    if (state.state === "revoked") {
      throw new Error("Connection was cancelled.");
    }

    if (state.state === "expired") {
      throw new Error("Connection was not confirmed.");
    }

    const walletConfig = new ConfigStore(state.wallet.walletConfig);

    return {
      address: state.wallet.address,
      publicKey: walletConfig.getString("pk"),
      walletVersion: state.wallet.walletType,
    };
  }

  getWallet(session: TonhubCreatedSession): Promise<Wallet> {
    return this.awaitReadiness(session);
  }

  async requestTransaction(session: TonhubCreatedSession, request: TransactionRequest, onSuccess?: () => void): Promise<void> {
    
    if(isMobile){
      onSuccess!!()
      const link = `https://tonhub.com/transfer/${request.to}?amount=${request.value}&bin=${base64UrlEncode(request.payload)}`;
      window.location.href = link;
     
      return;
    }
    const state = await this.tonhubConnector.getSessionState(session.id);
    
    if (state.state !== 'ready'){
      throw new Error('State is not ready');
    }
    
    const response = await this.tonhubConnector.requestTransaction({
      seed: session.seed,
      appPublicKey: state.wallet.appPublicKey,
      to: request.to,
      value: request.value,
      timeout: request.timeout,
      // stateInit: request.stateInit?.toString('base64'),
      text: request.text,
      payload: request.payload,
    });

    if (response.type === "rejected") {
      throw new Error("Transaction was rejected.");
    }

    if (response.type === "expired") {
      throw new Error("Transaction was expired.");
    }

    if (response.type === "invalid_session") {
      throw new Error("Something went wrong. Refresh the page and try again.");
    }

    if (response.type === "success") {
      onSuccess && onSuccess();
      // Handle successful transaction
      // const externalMessage = response.response; // Signed external message that was sent to the network
    }
  }

  isAvailable(): boolean {
    return true;
  }
}
