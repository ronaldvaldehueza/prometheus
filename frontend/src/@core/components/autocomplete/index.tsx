import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { AlertCircle } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import '@styles/base/bootstrap-extended/_include.scss';
import './autocomplete.scss';

interface SuggestionItem {
  link?: string;
  [key: string]: any;
}

interface SuggestionGroup {
  data: SuggestionItem[];
  searchLimit: number;
  [key: string]: any;
}

interface AutocompleteProps {
  value?: string;
  filterKey: string;
  suggestions: SuggestionGroup[] | SuggestionItem[];
  grouped?: boolean;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>, userInput: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput?: (userInput: string, setUserInput: (value: string) => void) => void;
  placeholder?: string;
  externalClick?: () => void;
  defaultValue?: string;
  wrapperClass?: string;
  filterHeaderKey?: string;
  suggestionLimit?: number;
  onSuggestionsShown?: (userInput: string) => void;
  onSuggestionClick?: (url: string | undefined, e: React.SyntheticEvent) => void;
  customRender?: (
    item: SuggestionItem,
    i: number,
    filteredData: SuggestionItem[],
    activeSuggestion: number,
    onSuggestionItemClick: (url: string | undefined, e: React.SyntheticEvent) => void,
    onSuggestionItemHover: (index: number) => void,
    userInput: string
  ) => JSX.Element;
  defaultSuggestions?: boolean;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = (props) => {
  const container = useRef<HTMLDivElement>(null);
  const inputElRef = useRef<HTMLInputElement>(null);
  const suggestionsListRef = useRef<PerfectScrollbar>(null);

  const [focused, setFocused] = useState<boolean>(false);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>(props.value ? props.value : '');

  const history = useHistory();
  let filteredData: SuggestionItem[] = [];

  const onSuggestionItemClick = (url: string | undefined, e: React.SyntheticEvent) => {
    setActiveSuggestion(0);
    setShowSuggestions(false);
    setUserInput(filteredData[activeSuggestion][props.filterKey]);
    if (url !== undefined && url !== null) {
      history.push(url);
    }

    if (props.onSuggestionClick) {
      props.onSuggestionClick(url, e);
    }
  };

  const onSuggestionItemHover = (index: number) => {
    setActiveSuggestion(index);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserInput = e.currentTarget.value;
    setActiveSuggestion(0);
    setShowSuggestions(true);
    setUserInput(newUserInput);
    if (newUserInput.length < 1) {
      setShowSuggestions(false);
    }
  };

  const onInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { filterKey } = props;
    const suggestionList = suggestionsListRef.current;

    if (e.keyCode === 38 && activeSuggestion !== 0) {
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40 && activeSuggestion < filteredData.length - 1) {
      setActiveSuggestion(activeSuggestion + 1);
    } else if (e.keyCode === 27) {
      setShowSuggestions(false);
      setUserInput('');
    } else if (e.keyCode === 13 && showSuggestions) {
      onSuggestionItemClick(filteredData[activeSuggestion].link, e);
      setUserInput(filteredData[activeSuggestion][filterKey]);
      setShowSuggestions(false);
    }

    if (props.onKeyDown) {
      props.onKeyDown(e, userInput);
    }
  };

  const renderGroupedSuggestion = (arr: SuggestionItem[]) => {
    const { filterKey, customRender } = props;

    const renderSuggestion = (item: SuggestionItem, i: number) => {
      if (!customRender) {
        const suggestionURL = item.link;
        return (
          <li
            className={classnames('suggestion-item', {
              active: filteredData.indexOf(item) === activeSuggestion
            })}
            key={item[filterKey]}
            onClick={e => onSuggestionItemClick(suggestionURL, e)}
            onMouseEnter={() => onSuggestionItemHover(filteredData.indexOf(item))}
          >
            {item[filterKey]}
          </li>
        );
      } else if (customRender) {
        return customRender(
          item,
          i,
          filteredData,
          activeSuggestion,
          onSuggestionItemClick,
          onSuggestionItemHover,
          userInput
        );
      }
      return null;
    };

    return arr.map(renderSuggestion);
  };

  const renderUngroupedSuggestions = () => {
    const { filterKey, suggestions, customRender, suggestionLimit } = props;
    filteredData = [];
    const sortSingleData = (suggestions as SuggestionItem[])
      .filter(i => {
        const startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase());
        const includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());
        return startCondition || includeCondition;
      })
      .slice(0, suggestionLimit);

    filteredData.push(...sortSingleData);

    if (sortSingleData.length) {
      return sortSingleData.map((suggestion, index) => {
        if (!customRender) {
          return (
            <li
              className={classnames('suggestion-item', {
                active: filteredData.indexOf(suggestion) === activeSuggestion
              })}
              key={suggestion[filterKey]}
              onClick={e => onSuggestionItemClick(suggestion.link, e)}
              onMouseEnter={() => onSuggestionItemHover(filteredData.indexOf(suggestion))}
            >
              {suggestion[filterKey]}
            </li>
          );
        } else if (customRender) {
          return customRender(
            suggestion,
            index,
            filteredData,
            activeSuggestion,
            onSuggestionItemClick,
            onSuggestionItemHover,
            userInput
          );
        }
        return null;
      });
    } else {
      return (
        <li className='suggestion-item no-result'>
          <AlertCircle size={15} /> <span className='align-middle ms-50'>No Result</span>
        </li>
      );
    }
  };

  const renderSuggestions = () => {
    const { filterKey, grouped, filterHeaderKey, suggestions } = props;

    if (!grouped) {
      return renderUngroupedSuggestions();
    } else {
      filteredData = [];
      return (suggestions as SuggestionGroup[]).map(suggestion => {
        const sortData = suggestion.data
          .filter(i => {
            const startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase());
            const includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());
            return startCondition || includeCondition;
          })
          .slice(0, suggestion.searchLimit);

        filteredData.push(...sortData);
        return (
          <Fragment key={suggestion[filterHeaderKey!]}>
            <li className='suggestion-item suggestion-title-wrapper'>
              <h6 className='suggestion-title'>{suggestion[filterHeaderKey!]}</h6>
            </li>
            {sortData.length ? (
              renderGroupedSuggestion(sortData)
            ) : (
              <li className='suggestion-item no-result'>
                <AlertCircle size={15} /> <span className='align-middle ms-50'>No Result</span>
              </li>
            )}
          </Fragment>
        );
      });
    }
  };

  useEffect(() => {
    if (props.defaultSuggestions && focused) {
      setShowSuggestions(true);
    }
  }, [focused, props.defaultSuggestions]);

  useEffect(() => {
    if (inputElRef.current && props.autoFocus) {
      inputElRef.current.focus();
    }
    if (props.clearInput) {
      props.clearInput(userInput, setUserInput);
    }
    if (props.onSuggestionsShown && showSuggestions) {
      props.onSuggestionsShown(userInput);
    }
  }, [userInput, showSuggestions, props, focused]);

  useOnClickOutside(container, () => {
    setShowSuggestions(false);
    if (props.externalClick) {
      props.externalClick();
    }
  });

  return (
    <div className='autocomplete-container' ref={container}>
      <input
        type='text'
        onChange={e => {
          onChange(e);
          if (props.onChange) {
            props.onChange(e);
          }
        }}
        onKeyDown={onKeyDown}
        value={userInput}
        className={`autocomplete-search ${props.className || ''}`}
        placeholder={props.placeholder}
        onClick={onInputClick}
        ref={inputElRef}
        onFocus={() => setFocused(true)}
        autoFocus={props.autoFocus}
        onBlur={e => {
          if (props.onBlur) props.onBlur(e);
          setFocused(false);
        }}
      />
      {showSuggestions && (
        <PerfectScrollbar
          className={classnames('suggestions-list', {
            [props.wrapperClass!]: props.wrapperClass
          })}
          ref={suggestionsListRef}
          component='ul'
          options={{ wheelPropagation: false }}
        >
          {renderSuggestions()}
        </PerfectScrollbar>
      )}
    </div>
  );
};

export default Autocomplete;
