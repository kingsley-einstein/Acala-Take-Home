/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Vec } from "@polkadot/types";
import { EventRecord } from "@polkadot/types/interfaces";
import {
  Input,
  Flex,
  Button,
  Loader,
  Table,
  THead,
  TD,
  TR,
  Card
} from "../../components";
import reducer from "../../state/reducer";
import { initialState } from "../../state";

interface Details {
  blockNumber?: number;
  eventName?: string;
  eventArguments?: string;
  phase?: string;
}

const ExtendedTD = styled(TD)`
  border-bottom: 1px solid #ddd;
`;

const ExtendedTHead = styled(THead)`
  border-bottom: 1px solid #ddd;
`;

const ErrorText = styled.span<any>`
  color: red;
  font-size: 13px;
  margin: ${(props) => props.margin};
`;

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [startBlock, setStartBlock] = useState(0);
  const [endBlock, setEndBlock] = useState(0);
  const [apiInjected, setApiInjected] = useState(false);
  const [listOfEvents, setListOfEvents] = useState<Array<Details>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const setApi = (payload: any) =>
    dispatch({
      type: "API_INJECTED",
      payload
    });

  const setEndpoint = (e: any) =>
    dispatch({
      type: "CHANGE_ENDPOINT",
      payload: e.target.value
    });

  const loadEndBlockNumber = async () => {
    const header = await state.api?.rpc.chain.getHeader();
    setEndBlock(parseInt(header?.number.toString() as string));
  };

  const handleStartBlockChange = (e: any) => {
    setStartBlock(e.target.value);
  };

  const handleEndBlockChange = (e: any) => {
    setEndBlock(e.target.value);
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    const eventDet: Array<Details> = [];
    for (let i = startBlock; i <= endBlock; i++) {
      const blockHash = await state.api?.rpc.chain.getBlockHash(i);
      const events = await state.api?.query.system.events.at(
        blockHash?.toString() as string
      );
      (events as Vec<EventRecord>).forEach((record) => {
        const { event, phase } = record;
        let detail: Details = { blockNumber: i };
        detail = {
          ...detail,
          eventName: `${event.section}.${event.method}`,
          eventArguments: `${event.meta.docs.toString()}`,
          phase: phase.toString()
        };
        eventDet.push(detail);
      });
    }
    setListOfEvents(eventDet);
    setIsLoading(false);
  };

  const submit = async () => {
    await fetchEvents();
  };

  useEffect(() => {
    const injectApi = async () => {
      const provider = new WsProvider(state.endpoint);
      const api = await ApiPromise.create({ provider });
      setApi(api);
      setApiInjected(true);
    };
    injectApi();
  }, []);

  useEffect(() => {
    if (
      !!state.endpoint &&
      (state.endpoint.startsWith("ws://") ||
        state.endpoint.startsWith("wss://"))
    ) {
      const provider = new WsProvider(state.endpoint);
      ApiPromise.create({ provider }).then(setApi);
    }
  }, [state.endpoint]);

  useEffect(() => {
    if (apiInjected) {
      loadEndBlockNumber();
    }
  }, [apiInjected]);

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Flex
          margin="16px"
          flexFlow="row wrap"
          justifyContent="center"
          alignItems="center"
        >
          <Flex
            margin="3px"
            flexFlow="column wrap"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              {...register("startBlock", {
                required: true,
                valueAsNumber: true,
                min: 1
              })}
              margin="3px"
              padding="12px"
              type="number"
              placeholder="Enter start block"
              border="2px solid #dcdcdc"
              borderRadius="5px"
              onChange={handleStartBlockChange}
              value={startBlock}
            />
            {errors.startBlock?.type === "required" && (
              <ErrorText margin="2px 0 0 0">
                Starting block number is required
              </ErrorText>
            )}
            {errors.startBlock?.type === "min" && (
              <ErrorText margin="2px 0 0 0">
                Block number cannot be less than 1
              </ErrorText>
            )}
          </Flex>
          <Flex
            margin="3px"
            flexFlow="column wrap"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              {...register("endBlock", { required: true, valueAsNumber: true })}
              margin="3px"
              padding="12px"
              type="number"
              placeholder="Enter end block"
              border="2px solid #dcdcdc"
              borderRadius="5px"
              onChange={handleEndBlockChange}
              value={endBlock}
            />
            {errors.endBlock?.type === "required" && (
              <ErrorText margin="2px 0 0 0">
                Ending block number is required
              </ErrorText>
            )}
          </Flex>
          <Flex
            margin="3px"
            flexFlow="column wrap"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              {...register("endpoint", { required: true })}
              margin="3px"
              padding="12px"
              placeholder="Enter endpoint"
              border="2px solid #dcdcdc"
              borderRadius="5px"
              onChange={setEndpoint}
              value={state.endpoint}
            />
            {errors.endpoint?.type === "required" && (
              <ErrorText margin="2px 0 0 0">Endpoint is required</ErrorText>
            )}
          </Flex>
          <Button
            margin="3px 8px 3px"
            padding="12px"
            backgroundColor="teal"
            color="#fff"
            borderRadius="5px"
            fontSize="15px"
            type="submit"
          >
            {isLoading ? <Loader /> : "Scan"}
          </Button>
        </Flex>
      </form>
      <div>
        <Card>
          <Table>
            <thead>
              <TR>
                <ExtendedTHead>Block Number</ExtendedTHead>
                <ExtendedTHead>Event Name</ExtendedTHead>
                <ExtendedTHead>Event Metadata</ExtendedTHead>
                <ExtendedTHead>Phase</ExtendedTHead>
              </TR>
            </thead>
            <tbody>
              {listOfEvents.length > 0 ? (
                listOfEvents.map((ev, index) => (
                  <TR key={index}>
                    <ExtendedTD>{ev.blockNumber}</ExtendedTD>
                    <ExtendedTD>{ev.eventName}</ExtendedTD>
                    <ExtendedTD>{ev.eventArguments}</ExtendedTD>
                    <ExtendedTD>{ev.phase}</ExtendedTD>
                  </TR>
                ))
              ) : (
                <TR>
                  <ExtendedTD>No Data</ExtendedTD>
                </TR>
              )}
            </tbody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Home;
