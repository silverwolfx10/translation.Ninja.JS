/**
 * $translation
 * 
 * Formata um literal de string em cima de uma mascara a funcao curry
 * 
 * @module $translation
 * @uthor Cleber de Moraes Goncalves <cleber.programmer>
 * @example
 * 
 *        $translation('999.999.999-99', '48705796501');
 * 
 */
this.Ninja.module('$translation', [

  '$curry',
  '$iterator',
  '$join',
  '$map',
  '$slice'

], function ($curry, $iterator, $join, $map, $slice) {

  /**
   * Mapa de caracteres permitidos na mascara com sua referencia
   * regexp para validar o caracter
   */
  var hash = {
    
    '9': $curry(char)(/[0-9]/),
    'A': $curry(char)(/[a-zA-Z]/),
    '#': $curry(char)(/[a-zA-Z0-9]/),
    
    '.': $curry(gap)(/[\.]/),
    ',': $curry(gap)(/[\,]/),
    ':': $curry(gap)(/[\:]/),
    '-': $curry(gap)(/[\-]/),
    '/': $curry(gap)(/[\/]/),
    '(': $curry(gap)(/[\(]/),
    ')': $curry(gap)(/[\)]/),
    ' ': $curry(gap)(/[\ ]/),
    
  };
  
  /**
   * Verifica se o caracter analizado e valido
   * 
   * @private
   * @method char
   * @param {RegExp} pattern Expressao avaliadora
   * @param {Object} args Objeto iterator com um array dos caracteres a ser formatado
   * @param {String} key Caracter do hash
   * @return {String} Caracter valido
   * @example
   * 
   *        char(/[0-9]/, iteraror, '9');
   * 
   */
  function char(pattern, args, key) {
    return solve(pattern, args) || mapper(args, key);
  }
  
  /**
   * Verifica se o caracter analizado e valido
   * 
   * @private
   * @method gap
   * @param {RegExp} pattern Expressao avaliadora
   * @param {Object} args Objeto iterator com um array dos caracteres a ser formatado
   * @param {String} key Caracter do hash
   * @return {String} Separador valido
   * @example
   * 
   *        gap(/[0-9]/, iteraror, '9');
   * 
   */
  function gap(pattern, args, key) {
    return solve(pattern, args) || (args.prev() && key);
  }
  
  /**
   * Mapeia o proximo caracter se ele é uma char valido ou um gap
   * 
   * @private
   * @method mapper
   * @param {Object} args Objeto iterator com um array dos caracteres a ser formatado
   * @param {String} key Caracter do hash
   * @return {String} Caracter ou Gap valido
   * @example
   * 
   *        mapper(iteraror, '9');
   * 
   */
  function mapper(args, key) {
    return args.hasNext() ? hash[key](args, key) : null;
  }
  
  /**
   * Retorna ou proximo caracter caso ele passo no teste do pattern
   * 
   * @private
   * @method solve
   * @param {RegExp} pattern Expressao avaliadora
   * @param {Object} args Objeto iterator com um array dos caracteres a ser formatado
   * @return {Boolean|String} Proximo caracter valido ou false se for um gap
   * @example
   * 
   *        solve(/[0-9]/, iteraror);
   * 
   */
  function solve(pattern, args) {
    return pattern.test(args.next()) ? args.current() : !1;
  }
  
  /**
   * Formata um literal de string em cima de uma mascara
   * 
   * @public
   * @method translation
   * @param {String} a Pattern base para a formatacao
   * @param {String} b Literal que deve ser formatado conforme o pattern passado
   * @return {String} Literal formatado
   * @example
   * 
   *        translation('999.999.999-99', '48705796501');
   * 
   */
  function translation(a, b) {
    return $join($map($slice(a), $curry(mapper)($iterator(b))), '');
  }
  
  /**
   * Revelacao do servico $translation, encapsulando a visibilidade das funcoes
   * privadas
   */
  return $curry(translation);
  
});
